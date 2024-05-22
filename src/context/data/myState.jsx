import React, { useEffect, useState } from 'react';
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '../../fireabase/FirebaseConfig';

function MyState(props) {
    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    });
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [searchkey, setSearchkey] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterPrice, setFilterPrice] = useState('');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)";
        } else {
            setMode('light');
            document.body.style.backgroundColor = "white";
        }
    };

    const addProduct = async () => {
        if (Object.values(products).some(val => val == null)) {
            return toast.error("All fields are required");
        }
        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products);
            toast.success("Product added successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getProductData = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, 'products'), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
            });
            return () => data();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const edithandle = (item) => {
        setProducts(item);
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', products.id), products);
            toast.success("Product updated successfully");
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 800);
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (item) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', item.id));
            toast.success('Product deleted successfully');
            getProductData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getOrderData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "order"));
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
            });
            setOrder(ordersArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getUserData = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "users"));
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push({ ...doc.data(), id: doc.id });
            });
            setUser(usersArray);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrderData();
        getUserData();
    }, []);

    const getProductReviews = async (productId) => {
        setLoading(true);
        try {
            const reviewsQuery = query(collection(fireDB, 'reviews'), where('productId', '==', productId));
            const snapshot = await getDocs(reviewsQuery);
            const reviewsData = snapshot.docs.map(doc => doc.data());
            setReviews(prevReviews => [...prevReviews, ...reviewsData]);
        } catch (error) {
            console.error('Error fetching product reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (paymentId) => {
        setLoading(true);
        try {
            const orderQuery = query(collection(fireDB, 'order'), where('paymentId', '==', paymentId));
            const orderSnapshot = await getDocs(orderQuery);
            const orderDocs = orderSnapshot.docs;
            if (orderDocs.length === 0) {
                toast.error('Order not found');
                return;
            }
            const orderDoc = orderDocs[0];
            const orderId = orderDoc.id;
            const orderRef = doc(fireDB, 'order', orderId);
            await updateDoc(orderRef, { orderStatus: 'confirmed' });
            toast.success('Order confirmed');
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to confirm order');
        } finally {
            setLoading(false);
        }
    };

    const submitFeedback = async (productId, feedbackData) => {
        setLoading(true);
        try {
            const feedbackRef = collection(fireDB, 'reviews');
            const dataWithProductId = { ...feedbackData, productId };
            await addDoc(feedbackRef, dataWithProductId);
            toast.success('Feedback submitted successfully');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Failed to submit feedback');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product,
            edithandle, updateProduct, deleteProduct, order,
            user, searchkey, setSearchkey, filterType, setFilterType,
            filterPrice, setFilterPrice, updateOrderStatus, getProductReviews,
            submitFeedback, reviews
        }}>
            {props.children}
        </MyContext.Provider>
    );
}

export default MyState;

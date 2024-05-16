    import React, { useEffect, useState } from 'react'
    import MyContext from './myContext'
    import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
    import { toast } from 'react-toastify';
    import { fireDB } from '../../fireabase/FirebaseConfig';
    import { where } from 'firebase/firestore'; 
    import { updateDoc } from 'firebase/firestore';
    
    function myState(props) {
        const [mode, setMode] = useState('light');

        const toggleMode = () => {
            if (mode === 'light') {
                setMode('dark');
                document.body.style.backgroundColor = "rgb(17, 24, 39)"
            }
            else {
                setMode('light');
                document.body.style.backgroundColor = "white"
            }
        }

        const [loading, setLoading] = useState(false);

        const [products, setProducts] = useState({
            title: null,
            price: null,
            imageUrl: null,
            category: null,
            description: null,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        });

        const addProduct = async () => {
            if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
                return toast.error("all fields are required")
            }

            setLoading(true)

            try {
                const productRef = collection(fireDB, 'products');
                await addDoc(productRef, products)
                toast.success("Add product successfully");
                setTimeout(() => {
                    window.location.href = '/dashboard'
                }, 800);
                getProductData();
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
            // setProducts("")


        }

        const [product, setProduct] = useState([]);

        const getProductData = async () => {

            setLoading(true)

            try {
                const q = query(
                    collection(fireDB, 'products'),
                    orderBy('time')
                );

                const data = onSnapshot(q, (QuerySnapshot) => {
                    let productArray = [];
                    QuerySnapshot.forEach((doc) => {
                        productArray.push({ ...doc.data(), id: doc.id });
                    });
                    setProduct(productArray);
                    setLoading(false)
                });

                return () => data;

            } catch (error) {
                console.log(error)
                setLoading(false)
            }

        }

        useEffect(() => {
            getProductData();
        }, []);

        // update product function

        const edithandle = (item) => {
            setProducts(item)
        }

        const updateProduct = async () => {
            setLoading(true)
            try {

                await setDoc(doc(fireDB, 'products', products.id), products)
                toast.success("Product Updated successfully")
                setTimeout(() => {
                    window.location.href = '/dashboard'
                }, 800);
                getProductData();
                setLoading(false)

            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        // delete product

        const deleteProduct = async (item) => {
            setLoading(true)
            try {
                await deleteDoc(doc(fireDB, 'products', item.id))
                toast.success('Product Deleted successfully')
                getProductData();
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }


        const [order, setOrder] = useState([]);

        const getOrderData = async () => {
            setLoading(true)
            try {
                const result = await getDocs(collection(fireDB, "order"))
                const ordersArray = [];
                result.forEach((doc) => {
                    ordersArray.push(doc.data());
                    setLoading(false)
                });
                setOrder(ordersArray);
                // console.log(ordersArray)
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        const [user, setUser] = useState([]);

        const getUserData = async () => {
            setLoading(true)
            try {
                const result = await getDocs(collection(fireDB, "users"))
                const usersArray = [];
                result.forEach((doc) => {
                    usersArray.push(doc.data());
                    setLoading(false)
                });
                setUser(usersArray);
                // console.log(usersArray)
                setLoading(false);
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        useEffect(() => {
            getOrderData();
            getUserData();
        }, []);

        const [searchkey, setSearchkey] = useState('')
        const [filterType, setFilterType] = useState('')
        const [filterPrice, setFilterPrice] = useState('')
        
        const updateOrderStatus = async (paymentId) => {
            setLoading(true);
            try {
                const orderQuery = query(
                    collection(fireDB, 'order'),
                    where('paymentId', '==', paymentId)
                );
        
                const orderSnapshot = await getDocs(orderQuery);
                const orderDocs = orderSnapshot.docs;
        
                if (orderDocs.length === 0) {
                    // Handle case where order with given paymentId is not found
                    setLoading(false);
                    toast.error('Order not found');
                    return;
                }
        
                const orderDoc = orderDocs[0];
                const orderId = orderDoc.id;
        
                const orderRef = doc(fireDB, 'order', orderId);
                await updateDoc(orderRef, {
                    orderStatus: 'confirmed'
                });
                toast.success('Order Confirmed');
                setLoading(false);
            } catch (error) {
                console.error('Error updating order status:', error);
                setLoading(false);
                toast.error('Failed to confirm order');
            }
        };
        
          
          



        return (
            <MyContext.Provider value={{
                mode, toggleMode, loading, setLoading,
                products, setProducts, addProduct, product,
                edithandle, updateProduct, deleteProduct, order,
                user, searchkey, setSearchkey,filterType,setFilterType,
                filterPrice,setFilterPrice,updateOrderStatus,
            }}>
                {props.children}
            </MyContext.Provider>
        )   
    }

    export default myState
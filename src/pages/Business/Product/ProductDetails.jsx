import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Rate, Tag, Button, Card, Skeleton, Divider } from 'antd'
import { useGetSingleProductApisQuery, useGetVariantProductApisQuery } from '../../../Redux/sampler/productApis'
import { FaArrowLeft } from 'react-icons/fa'
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function ProductDetails() {
    const location = useLocation()
    const productId = location?.state?.productId
    const { data: productRes, isLoading: productLoading } = useGetSingleProductApisQuery({ id: productId }, { skip: !productId })
    const { data: variantProductRes, isLoading: variantProductLoading } = useGetVariantProductApisQuery({ id: productId }, { skip: !productId })
    const product = productRes?.data
    const variantProduct = variantProductRes?.data
    const [productPrice, setProductPrice] = useState(0)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const navigate = useNavigate()
    const thumbsRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || '')
    const handleImageClick = useCallback((img) => setSelectedImage(img), [])
    useEffect(() => {
        setProductPrice(product?.price?.toFixed(2))
    }, [product?.price])
    if (productLoading || variantProductLoading) {
        return (
            <div className='flex flex-col md:flex-row gap-3 max-w-screen-lg mx-auto'>
                <div>
                    <Skeleton.Image style={{ width: '400px', height: '400px' }} active />
                    <div className='flex gap-2 mt-2'>
                        <Skeleton.Image style={{ width: '50px', height: '50px' }} active />
                        <Skeleton.Image style={{ width: '50px', height: '50px' }} active />
                        <Skeleton.Image style={{ width: '50px', height: '50px' }} active />
                    </div>
                </div>
                <Card style={{ width: '100%' }}>
                    <Skeleton active />
                    <div className='flex flex-col mb-2 gap-2'>
                        <Skeleton.Button />
                        <Skeleton.Input />
                    </div>
                    <Skeleton active />
                </Card>
            </div>
        )
    }

    const scrollThumbnails = (direction) => {
        if (thumbsRef.current) {
            const scrollAmount = 120;
            thumbsRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="container mx-auto pb-12">
            <h1
                onClick={() => navigate(-1)}
                className="text-xl w-fit cursor-pointer flex items-center gap-2"><FaArrowLeft />Back to products</h1>
            <div className="flex flex-col md:flex-row gap-10">
                <div>
                    <div className="aspect-square p-2 border w-[200px] h-[200px] md:w-[400px] md:h-[400px]  border-gray-200 rounded-xl overflow-hidden">
                        <img src={selectedImage || product?.images[0]} alt={product?.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="relative mt-4 w-[300px] bg-gray-100 rounded-md md:w-[400px]">
                        <button
                            onClick={() => scrollThumbnails("left")}
                            className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 z-10"
                        >
                            <IoChevronBack size={20} />
                        </button>

                        <div
                            ref={thumbsRef}
                            className="flex gap-3 overflow-x-auto scrollbar-hide py-1 px-6"
                        >
                            {product?.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleImageClick(img)}
                                    className={`w-20 cursor-pointer h-20 border overflow-hidden
                                         border-gray-200 rounded-lg shrink-0 
                                             ${selectedImage === img ?
                                            'ring-2 ring-gray-200' : ''}`}
                                >
                                    <img
                                        src={img}
                                        alt="thumb"
                                        className="w-full rounded-lg h-full object-contain"
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollThumbnails("right")}
                            className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-1 z-10"
                        >
                            <IoChevronForward size={20} />
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold mb-1">{product?.name}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{product?.brand}</span>
                            <Rate disabled defaultValue={product?.avgRating || 0} /><small>{product?.avgRating}</small>
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-blue-600">${productPrice}</div>
                    <div className="flex gap-2 flex-wrap">
                        {product?.tags.map((tag, i) => (
                            <Tag key={i} color="blue">{tag}</Tag>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <small className="text-gray-500"><strong>Product short description:</strong> {product?.shortDescription}</small>
                        <small className="text-sm text-gray-500"><strong>Stock:</strong> {product?.stock} | <strong>Weight:</strong> {product?.weight} lbs</small>
                    </div>
                    <div className="flex items-center mt-2 gap-4">
                        <Link to={`/edit-product/${productId}`} state={{ id: productId }}>
                            <Button
                                type="primary"

                                size="middle"
                            >
                                Edit Product
                            </Button>
                        </Link>
                        <Link to={`/add-variant/${productId}`} state={{ id: productId, name: product?.name }}>
                            <Button

                                type="default"
                                size="middle"
                            >
                                Edit Variant
                            </Button>
                        </Link>
                    </div>
                    {
                        variantProduct?.length > 0 && (
                            <div>
                                <h2>Variants</h2>
                                <div className="flex gap-2">
                                    {
                                        variantProduct?.map((variant) => (
                                            <div key={variant?._id}
                                                onClick={() => {
                                                    setProductPrice(parseFloat(variant?.price).toFixed(2))
                                                    setSelectedVariant(variant)
                                                }}
                                                className={`
                                                    px-3 py-1 border border-gray-200
                                                 rounded cursor-pointer hover:bg-blue-300
                                                    ${selectedVariant?._id === variant?._id ? 'bg-blue-500 text-white' : ''}
                                                    `}
                                            >
                                                <small>{variant?.variantValue.toUpperCase()}</small>
                                            </div>
                                        ))
                                    }
                                </div>
                                {selectedVariant && (<Card className="!mt-2">
                                    <h2 className="text-lg font-semibold">Variant Details</h2>
                                    <div>
                                        <small className="text-lg text-gray-500">Variant Option: {selectedVariant?.variantOption} | Variant Value: {selectedVariant?.variantValue} | Variant Price: ${selectedVariant?.price}</small>
                                    </div>

                                </Card>)}
                            </div>
                        )
                    }
                </div>
            </div>
            <Divider />
            <div dangerouslySetInnerHTML={{ __html: product?.description }} />
        </div>
    )
}

export default ProductDetails

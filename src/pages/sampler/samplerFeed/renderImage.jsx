import React from 'react'
import { Modal } from "antd"

export const renderImage = (images) => {
    const count = images.length
    if (count === 0) return null
    const gridClass =
        count === 1
            ? 'grid-cols-1'
            : count === 2
                ? 'grid-cols-2'
                : count === 3
                    ? 'grid-cols-3'
                    : 'grid-cols-2'

    const setShowAllImage = (images) => {
        return new Promise((resolve) => {
            Modal.confirm({
                content: (
                    <div className="grid grid-cols-2 gap-4">
                        {
                            images?.map((img, index) => {
                                return (
                                    <div className="w-full bg-gray-50 p-4 flex items-center justify-center rounded-md h-full object-cover" key={index}>
                                        <img className="w-full h-full object-cover" src={img} alt={img} />
                                    </div>
                                )
                            })
                        }
                    </div>
                ),
                icon: null,
                okText: 'close',
                okCancel: false,
                onOk: () => {
                    resolve(true);
                },
                width: 600
            });
        });
    }
    return (
        <div className={`grid ${gridClass} gap-1 w-full mb-4`}>
            {images.slice(0, 4).map((img, index) => {
                const isLast = index === 3 && count > 4
                return (
                    <div
                        key={index}
                        className="relative w-full aspect-auto bg-gray-50 flex items-center justify-center overflow-hidden"
                    >
                        <img
                            src={img}
                            alt="post_image"
                            className="w-48 h-48 aspect-square object-contain"
                        />

                        {isLast && (
                            <div
                                onClick={() => setShowAllImage(images)}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-3xl font-semibold">
                                    +{count - 4}
                                </span>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
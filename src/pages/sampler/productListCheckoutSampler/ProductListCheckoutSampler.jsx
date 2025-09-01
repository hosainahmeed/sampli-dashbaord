import React, { useState } from 'react'
import {
  Table,
  Button,
  InputNumber,
  Space,
  Empty,
  Typography,
  Divider,
} from 'antd'
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import productImage from '/public/product_image.svg'

const { Title, Text } = Typography

const SoloStoveCart = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Pi Pizza Oven',
      quantity: 1,
      price: 100,
      img: productImage,
    },
    {
      id: 2,
      name: 'Grill Ultimate Bundle',
      quantity: 1,
      price: 200.5,
      img: productImage,
    },
    {
      id: 3,
      name: 'Starters',
      quantity: 1,
      price: 10.55,
      img: productImage,
    },
    {
      id: 4,
      name: 'Charcoal Grill Pack',
      quantity: 1,
      price: 1.5,
      img: productImage,
    },
  ])

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const grandTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const columns = [
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'item',
      width: 300,
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={record.img}
            alt={text}
            style={{
              width: 64,
              height: 64,
              marginRight: 16,
              objectFit: 'contain',
            }}
          />
          <Text strong>{text}</Text>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'center',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      align: 'center',
      render: (quantity, record) => (
        <Space>
          <Button
            onClick={() => decreaseQuantity(record.id)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={quantity}
            style={{ width: 50, textAlign: 'center' }}
            readOnly
          />
          <Button onClick={() => increaseQuantity(record.id)}>+</Button>
        </Space>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      width: 120,
      align: 'right',
      render: (record) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: 8 }}>
            ${(record.price * record.quantity).toFixed(2)}
          </span>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => removeItem(record.id)}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="responsive-width">
      <div
        className=" mx-auto "
        style={{ margin: '20px 0 128px', overflow: 'auto' }}
      >
        <Title level={2} style={{ marginBottom: 20 }}>
          Cart Items
        </Title>

        {cart.length > 0 ? (
          <>
            <Table
              columns={columns}
              dataSource={cart}
              rowKey="id"
              pagination={false}
              scroll={{ x: 700 }}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Text strong style={{ fontSize: 16 }}>
                        Grand Total:
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <Text strong style={{ fontSize: 20 }}>
                        ${grandTotal.toFixed(2)}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />

            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => toast.success('Checkout Successfully!')}
                style={{ height: 50 }}
              >
                Check out
              </Button>
            </div>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '400px',
              justifyContent: 'center',
              height: '80vh',
            }}
          >
            <Empty
              image={<ShoppingOutlined style={{ fontSize: 64 }} />}
              description={
                <div style={{ textAlign: 'center' }}>
                  <Title level={3}>Your cart is empty</Title>
                  <Divider
                    style={{
                      width: 64,
                      minWidth: 64,
                      backgroundColor: '#f5a623',
                      margin: '16px auto',
                    }}
                  />
                  <Text type="secondary">
                    Looks like you haven&apos;t added any items to your cart
                    yet.
                  </Text>
                </div>
              }
            >
              <Link to="/sampler/shop">
                <Button type="primary" size="large">
                  Start Shopping
                </Button>
              </Link>
            </Empty>
          </div>
        )}
      </div>
    </div>
  )
}

export default SoloStoveCart

import React, { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Checkbox, Card, Empty } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const productsData = [
  {
    id: 1,
    name: 'Swim Brush',
    category: 'Electronics',
    price: 79.99,
    units: 200,
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ecad41185062331.655d204e38fad.jpg',
  },
  {
    id: 2,
    name: 'Brush for Europe',
    category: 'Electronics',
    price: 79.99,
    units: 200,
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ecad41185062331.655d204e38fad.jpg',
  },
  {
    id: 3,
    name: 'Headphones',
    category: 'Electronics',
    price: 79.99,
    units: 200,
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ecad41185062331.655d204e38fad.jpg',
  },
  {
    id: 4,
    name: 'Brush for Europe',
    category: 'Electronics',
    price: 79.99,
    units: 200,
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ecad41185062331.655d204e38fad.jpg',
  },
  {
    id: 5,
    name: 'Headphones',
    category: 'Electronics',
    price: 79.99,
    units: 200,
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/ecad41185062331.655d204e38fad.jpg',
  },
];

const ProductSelection = () => {
  const [products, setProducts] = useState(productsData);
  const [selectedProducts, setSelectedProducts] = useState(
    JSON.parse(localStorage.getItem('selectedProducts')) || []
  );
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let filteredProducts = productsData.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOrder === 'recent') {
      filteredProducts = filteredProducts.reverse();
    } else if (sortOrder === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filteredProducts);
  }, [search, sortOrder]);

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handleSelect = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
    toast.success(`Selected ${product.name}`);
  };

  const menu = (
    <Menu onClick={({ key }) => setSortOrder(key)}>
      <Menu.Item key="recent">Recent</Menu.Item>
      <Menu.Item key="name">Name</Menu.Item>
    </Menu>
  );

  const categoryMenu = (
    <Menu onClick={({ key }) => setSelectedCategory(key)}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Electronics">Electronics</Menu.Item>
      <Menu.Item key="Beauty">Beauty</Menu.Item>
    </Menu>
  );

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Choose Existing Product</h2>
      <p className="text-gray-500 mb-4">
        Choose products from your catalog to include in this campaign.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Dropdown overlay={menu} trigger={['click']}>
          <Button>
            Sort by: {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
          </Button>
        </Dropdown>
        <Dropdown overlay={categoryMenu} trigger={['click']}>
          <Button icon={<FilterOutlined />}>{selectedCategory}</Button>
        </Dropdown>
      </div>

      <div className="space-y-3 flex flex-col gap-3">
        {products.length > 0 ? (
          products.map((product) =>
            products.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={product.image}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-gray-500 text-sm">
                        {product.category}
                      </p>
                      <p className="text-gray-500 text-sm">
                        ${product.price} • {product.units} Units
                    </p>
                    </div>
                  </div>
                  <div>
                    <Checkbox
                      checked={selectedProducts.some(
                        (p) => p.id === product.id
                      )}
                      onChange={() => handleSelect(product)}
                    />
                  </div>
                </div>
              </Card>
            ))
          )
        ) : (
          <Empty description="No products found" />
        )}
      </div>
    </div>
  );
};

export default ProductSelection;

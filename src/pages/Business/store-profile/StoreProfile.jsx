import React, { useState } from 'react';
import { Button, Card, Pagination } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import logo from '../../../assets/logo/logo.svg';
import { CiCalendar, CiStar } from 'react-icons/ci';
import converImage from '../../../assets/cover-image.png';
import SelectField from '../../../components/page-Component/SelectField';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ReviewRating from '../../../components/store-profile-component/ReviewRating';
import ReviewCard from '../../../components/store-profile-component/ReviewCard';
const { Meta } = Card;

function StoreProfile() {
  const description =
    'It all started with a little camera shop in Brooklyn. Founded by Abe Berkowitz in 1966, Focus has faithfully served the New York City Metropolitan Area for over half a century. In that time, we’ve built a tight knit community of photographers, videographers, musicians, and other creators passionate about reaching their goals.Today we have two retail store locations, hundreds of employees, and millions of customers from around the world, whom we reach through our award-winning website. However, our mission remains the same: to help creators find the gear they need to realize their vision.';

  const items = [
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'BENGOO G9000 Stereo Gaming Headset',
      description: 'High-quality wireless headphones with noise cancellation',
      price: '$5.00',
      originalPrice: '$4.00',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'BENGOO G9000 Stereo Gaming Headset',
      description: 'High-quality wireless headphones with noise cancellation',
      price: '$5.00',
      originalPrice: '$4.00',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'Mini Portable Refillable Sprayer Atomizer Bottle 5ml',
      description: 'Compact and portable sprayer for your favorite fragrance',
      price: '$3.00',
      originalPrice: '$2.50',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'Ox 18 Inches Standing Plus Fan',
      description: 'Powerful fan to keep you cool during hot days',
      price: '$10.00',
      originalPrice: '$8.00',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'Gaming Headset',
      description: 'Immersive sound experience for gamers',
      price: '$7.00',
      originalPrice: '$5.50',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'Portable Speaker',
      description: 'Compact speaker with high-quality sound',
      price: '$15.00',
      originalPrice: '$12.00',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'Smartwatch',
      description: 'Feature-rich smartwatch with multiple health tracking',
      price: '$25.00',
      originalPrice: '$20.00',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'Wireless Bluetooth Earbuds',
      description: 'Comfortable earbuds with superior sound quality',
      price: '$30.00',
      originalPrice: '$25.00',
    },
    {
      image:
        'https://t3.ftcdn.net/jpg/00/91/07/82/360_F_91078252_i7cx2uJzDzgoJGDdUAHtVAcpjugVauX9.jpg',
      title: 'Digital Camera',
      description: 'Capture high-resolution photos and videos',
      price: '$200.00',
      originalPrice: '$180.00',
    },
    // Add more items as needed
  ];

  const reviewData = [
    {
      name: 'Adeyoka George',
      rating: 2,
      date: '2024-03-12',
      reviewerImage:
        'https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png',
      description:
        'This is the description of the product the customer wants to buy.',
      productImage:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      productName: 'High-quality wireless headphones with noise cancellation',
    },
    {
      name: 'Adeyoka George',
      rating: 2,
      date: '2024-03-12',
      reviewerImage:
        'https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png',
      description:
        'This is the description of the product the customer wants to buy.',
      productImage:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      productName: 'High-quality wireless headphones with noise cancellation',
    },
    {
      name: 'Adeyoka George',
      rating: 2,
      date: '2024-03-12',
      reviewerImage:
        'https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png',
      description:
        'This is the description of the product the customer wants to buy.',
      productImage:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      productName: 'High-quality wireless headphones with noise cancellation',
    },
    {
      name: 'Adeyoka George',
      rating: 2,
      date: '2024-03-12',
      reviewerImage:
        'https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png',
      description:
        'This is the description of the product the customer wants to buy.',
      productImage:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      productName: 'High-quality wireless headphones with noise cancellation',
    },
    {
      name: 'Adeyoka George',
      rating: 2,
      date: '2024-03-12',
      reviewerImage:
        'https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png',
      description:
        'This is the description of the product the customer wants to buy.',
      productImage:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      productName: 'High-quality wireless headphones with noise cancellation',
    },
    {
      name: 'Adeyoka George',
      rating: 2,
      date: '2024-03-12',
      reviewerImage:
        'https://storage.googleapis.com/dara-c1b52.appspot.com/daras_ai/media/2a9500aa-74f9-11ee-8902-02420a000165/gooey.ai%20-%20A%20beautiful%20anime%20drawing%20of%20a%20smilin...ibli%20ponyo%20anime%20excited%20anime%20saturated%20colorsn.png',
      description:
        'This is the description of the product the customer wants to buy.',
      productImage:
        'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
      productName: 'High-quality wireless headphones with noise cancellation',
    },
    // Add more reviews here...
  ];

  // Pagination logic for items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination logic for reviews
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 5;
  const currentReviews = reviewData.slice(
    (reviewPage - 1) * reviewsPerPage,
    reviewPage * reviewsPerPage
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onReviewPageChange = (page) => {
    setReviewPage(page);
  };

  return (
    <div>
      <div className="z-[888] relative">
        <img src={converImage} alt="sampli cover image" />
      </div>
      <div className="max-w-screen-xl mx-auto px-2 -mt-24 z-[999] relative">
        <div className="w-48 h-48 rounded-full shadow-2xl flex items-center bg-white justify-center">
          <img src={logo} alt="sampli image logo" />
        </div>
        <div className="mt-12 flex items-center gap-12 text-[#6D7486]">
          <h1 className="flex items-center gap-2">
            <CiCalendar />
            Joined Feb 2002
          </h1>
          <h1 className="flex items-center gap-2">
            <CiStar />
            99% positive feedback
          </h1>
          <h1 className="flex items-center gap-2">
            <AiOutlineUser />
            23 followers
          </h1>
        </div>
        <p className="text-[#6D7486] text-sm xl:text-base leading-7">
          {description}
        </p>
        <div className="flex items-center justify-between my-12">
          <h2 className="text-3xl">Items</h2>
          {/* Your category and sorting select fields */}
        </div>
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {currentItems.map((item, index) => (
            <CardComponent key={index} item={item} />
          ))}
        </div>
        <Pagination
          current={currentPage}
          total={items.length}
          pageSize={itemsPerPage}
          onChange={onPageChange}
          className="!my-12 flex items-center justify-center"
          showSizeChanger={false}
          itemRender={(current, type, originalElement) => {
            if (type === 'prev') {
              return (
                <Button className="!border-none ">
                  <FaAngleLeft />
                </Button>
              );
            }
            if (type === 'next') {
              return (
                <Button className="!border-none ">
                  <FaAngleRight />
                </Button>
              );
            }
            if (type === 'page') {
              return current;
            }
            return originalElement;
          }}
        />
        <div className="flex items-start gap-24 justify-between">
          <div className="flex-1 sticky top-10">
            <ReviewRating />
          </div>
          <div className="mx-auto font-sans flex-1">
            <div className="w-full flex items-center gap-3 justify-between">
              <SelectField
                placeholder={'select all'}
                className="!w-full"
                options={[
                  { label: 'Recommended', value: 'yes' },
                  { label: 'Not Recommended', value: 'no' },
                ]}
              ></SelectField>
              <SelectField
                placeholder={'All stars'}
                className="!w-full"
                options={[
                  { label: '1 star', value: '1' },
                  { label: '2 stars', value: '2' },
                  { label: '3 stars', value: '3' },
                  { label: '4 stars', value: '4' },
                  { label: '5 stars', value: '5' },
                ]}
              ></SelectField>
            </div>
            {currentReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
            <Pagination
              current={reviewPage}
              total={reviewData.length}
              pageSize={reviewsPerPage}
              onChange={onReviewPageChange}
              className="!my-12 flex items-center justify-center"
              showSizeChanger={false}
              itemRender={(current, type, originalElement) => {
                if (type === 'prev') {
                  return (
                    <Button className="!border-none ">
                      <FaAngleLeft />
                    </Button>
                  );
                }
                if (type === 'next') {
                  return (
                    <Button className="!border-none ">
                      <FaAngleRight />
                    </Button>
                  );
                }
                if (type === 'page') {
                  return current;
                }
                return originalElement;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreProfile;

const CardComponent = ({ item }) => {
  return (
    <Card
      className="shadow-md border-[1px] overflow-hidden border-[#eee]"
      cover={
        <img
          className="h-[300px] object-cover"
          alt="example"
          src={item.image}
        />
      }
    >
      <Meta
        title={item.title}
        description={
          <>
            <p>{item.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-semibold">{item.price}</span>
              <span className="text-gray-500 line-through">
                {item.originalPrice}
              </span>
            </div>
          </>
        }
      />
    </Card>
  );
};

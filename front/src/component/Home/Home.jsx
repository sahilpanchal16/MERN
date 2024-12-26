import React, { useEffect, useState } from 'react';
import './Home.css';
import img1 from '../../images/img1.webp';
import img2 from '../../images/img2.webp';
import img3 from '../../images/img3.webp';
import imgs1 from '../../images/imgs1.webp';
import imgs2 from '../../images/imgs2.webp';
import imgs3 from '../../images/imgs3.webp';
import imgs4 from '../../images/imgs4.webp';
import imgs5 from '../../images/imgs5.webp';
import imgs6 from '../../images/imgs6.webp';
import imgs7 from '../../images/imgs7.webp';
import imgs8 from '../../images/imgs8.webp';
import imgs9 from '../../images/imgs9.webp';
import imga1 from '../../images/imga1.jpg'

import Navbar from '../Header/Navbar';
import { Carousel, Container, Row, Col } from 'react-bootstrap';


const FullScreenVideo = () => (
    <div style={{ position: 'relative', height: '100vh', backgroundColor: '#000' }}>
        <video
            autoPlay
            loop
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
            <source src={require("../../images/mp4.mp4")} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
);

const CardSlider = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % Math.ceil(cards.length / 3)); // Adjust according to the number of slides
        }, 3000);

        return () => clearInterval(interval);
    }, );

    const cards = [
        { title: "Kurta", text: "60*17 SOLID FABRIC, LOOP KURTA WITH...", image: imgs1 },
        { title: "Polo T-Shirt", text: "MINI WAFFLE KNIT POLO WITH CHECK...", image: imgs2 },
        { title: "Kurta", text: "LINEN COTTON FABRIC SOLID KURTA WITH...", image: imgs3 },
        { title: "Lowers", text: "VISCOSE LYCRA TERRY FIT LOWER WITH SIDE...", image: imgs4 },
        { title: "Round Neck T-shirt", text: "60*17 SOLID FABRIC, LOOP KURTA WITH...", image: imgs5 },
        { title: "Kurta", text: "MINI WAFFLE KNIT POLO WITH CHECK...", image: imgs6 },
        { title: "Polo T-Shirt", text: "LINEN COTTON FABRIC SOLID KURTA WITH...", image: imgs7 },
        { title: "Polo T-Shirt", text: "MINI WAFFLE KNIT POLO WITH CHECK...", image: imgs8 },
        { title: "Polo T-Shirt", text: "SOLID FABRIC, LOOP KURTA WITH...", image: imgs9 },
    ];

    // Group cards into sets of three
    const getGroupedCards = () => {
        const groups = [];
        for (let i = 0; i < cards.length; i += 3) {
            groups.push(cards.slice(i, i + 3));
        }
        return groups;
    };

    const groupedCards = getGroupedCards();

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
            {groupedCards.map((group, idx) => (
                <Carousel.Item key={idx}>
                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                        {group.map((card, cardIdx) => (
                            <div className="card mx-3" style={{ width: '27%' }} key={cardIdx}>
                                <img src={card.image} className="card-img-top" alt={card.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

const LeftContentRightImage = () => {
    return (
        <Container>
            <Row className="align-items-center">
                <Col md={6}>
                    <p className='display-6 fw-bold'> 
                   <span className='text-secondary'> SUMMER <br /> BREEZE 2024: </span>
                    WHERE STYLE MEETS SUNSHINE</p>
                    <p>  
                    Dive into the heart of summer with our "Summer Breeze 2024" collection, a refreshing take on seasonal fashion. This line is a tribute to the vibrant energy of the sunniest days, featuring an array of chic, comfortable pieces that speak to the soul of summer.</p>
                    <button>EXPLORE COLLECTION</button>
                </Col>
                <Col md={6}>
                    <img src={imga1} alt="Description of image" className="img-fluid w-100" /> 
                </Col>
            </Row>
        </Container>
    );
};

function Home() {
    return (
        <>
            <Navbar />

            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img2} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={img3} className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <br />
            <div className="text-center display-6 fw-bold">
                <span className='text-black-50'>NEW</span>
                <span> ARRIVALS</span>
            </div>
            <br />
            <CardSlider />
            <br />
            <br />
            <LeftContentRightImage />
            <br />
            <FullScreenVideo />
            <br />
            <footer className="bg-light text-dark py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>We are a company dedicated to providing the best services.</p>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>

          </Col>
        </Row>
      </Container>
      <div className="text-center mt-3">
        <small>&copy; {new Date().getFullYear()} Your Company Name</small>
      </div>
    </footer>
    
        </>
    );
}

export default Home;

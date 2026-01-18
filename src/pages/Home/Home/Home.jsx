import { motion } from 'framer-motion'
import Banner from '../../../components/Home/Banner'
import FeaturedCategories from '../../../components/Home/FeaturedCategories'
import FeaturedCollections from '../../../components/Home/FeaturedCollections'
import LatestBooks from '../../../components/Home/LatestBooks'
import Testimonials from '../../../components/Home/Testimonials'
import WhyChooseBookHive from '../../../components/Home/WhyChooseBookHive'
import { useEffect, useState } from 'react'
import Coverage from '../../../components/Home/Coverage'
import HowItWorks from '../../../components/Home/HowItWorks '
import MeetLibrarians from '../../../components/Home/MeetLibrarians '

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0 },
}

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
}

function Home() {
  const [centerLocations, setCenterLocations] = useState([])

  useEffect(() => {
    fetch('/locations.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('Loaded JSON:', data)
        setCenterLocations(data)
      })
  }, [])

  return (
    <div className="overflow-hidden">
      <Banner />

      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <LatestBooks />
      </motion.div>

      <Coverage centerLocations={centerLocations} />

      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <WhyChooseBookHive />
      </motion.div>

      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <FeaturedCategories />
      </motion.div>

      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <FeaturedCollections />
      </motion.div>

      <Testimonials />
      <HowItWorks></HowItWorks>
      <MeetLibrarians></MeetLibrarians>
    </div>
  )
}

export default Home

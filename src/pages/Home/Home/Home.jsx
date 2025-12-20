import { motion } from 'framer-motion'
import Banner from '../../../components/Home/Banner'
import FeaturedCategories from '../../../components/Home/FeaturedCategories'
import FeaturedCollections from '../../../components/Home/FeaturedCollections'
import LatestBooks from '../../../components/Home/LatestBooks'
import Testimonials from '../../../components/Home/Testimonials'
import WhyChooseBookHive from '../../../components/Home/WhyChooseBookHive'

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0 },
}

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0 },
}

function Home() {
  return (
    <div className='overflow-hidden'>
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
    </div>
  )
}

export default Home

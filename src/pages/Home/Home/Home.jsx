import Banner from '../../../components/Home/Banner'
import FeaturedCategories from '../../../components/Home/FeaturedCategories'
import FeaturedCollections from '../../../components/Home/FeaturedCollections'
import LatestBooks from '../../../components/Home/LatestBooks'
import Testimonials from '../../../components/Home/Testimonials'
import WhyChooseBookHive from '../../../components/Home/WhyChooseBookHive'

function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <LatestBooks></LatestBooks>
      <WhyChooseBookHive></WhyChooseBookHive>
      <FeaturedCategories></FeaturedCategories>
      <FeaturedCollections></FeaturedCollections>
      <Testimonials></Testimonials>
    </div>
  )
}

export default Home

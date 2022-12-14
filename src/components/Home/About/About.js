import React from 'react';
import startup from '../../assets/images/startup.png'

const About = () => {
  return (
    <div class="py-16 bg-white">
      <div class="container mx-auto  text-gray-600 px-4 md:px-5 lg:px-6">
        <div class="space-y-6 md:space-y-0 md:flex md:gap-3 lg:items-center lg:gap-10">
          <div class="md:w-9/12 lg:w-5/12">
            <img src={startup} className="w-full" alt="tree" loading="lazy" width="" height="" />
          </div>
          <div class="md:w-6/12 lg:w-6/12">
            <h2 class="text-2xl text-gray-900 font-bold md:text-2xl lg:text-4xl">Nuxt development is carried out by passionate developers</h2>
            <p class="mt-6 text-gray-600"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellat porro. At minima consequuntur in incidunt ullam quasi eos architecto dolor, deleniti sed libero! </p>
            <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
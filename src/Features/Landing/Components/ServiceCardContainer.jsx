import React from 'react';
import ServiceCard from './ServiceCard';
import serviceData from '../../../Constant/OurServices/ServiceData.json';

function ServiceCardContainer() {
  return (
    <div className='d-flex flex-wrap justify-content-center py-5'>
      {
        serviceData?.map((service, index)=>{
          return(
            <div key={index}>
              <ServiceCard service={service} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ServiceCardContainer
import { useState } from "react";

const Featured = () => {
   const [features, setFeatures] = useState([]);
   useState(() => {
      fetch("data.json")
         .then((res) => res.json())
         .then((data) => setFeatures(data));
   }, []);

   return (
      <div className="flex flex-col items-center my-20">
         <h3 className="text-3xl font-bold">All the features you need</h3>
         <p className="text-sm text-gray-700 mt-2">
            You’ve got the ideas, we’ve got the tools
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center lg:grid-cols-3 justify-around xl:grid-cols-4 my-10">
            {features.map((feature) => (
               <div
                  key={feature.id}
                  className="card w-96 bg-base-100 shadow-xl"
               >
                  <figure>
                     <img src={feature?.img} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                     <h2 className="text-xl font-medium">{feature?.title}</h2>
                     <p>{feature?.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Featured;

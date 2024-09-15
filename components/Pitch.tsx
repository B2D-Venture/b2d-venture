import React from "react";
import PitchDescription from "./PitchDescription";

const Pitch = () => {
  return (
    <div>
      <div>
        <div className="ml-8 md:ml-[80px]">
          <PitchDescription
            label="Highlights"
            desc="Smart plants: Plants that can be monitored and controlled remotely, using sensors and artificial intelligence. Vertical farming systems: Systems that allow plants to be grown in high-density, indoor environments. Plant-based food products: Healthy and delicious food products made from plants. Plant-based materials: Sustainable materials made from plants, such as bioplastics and textiles."
          />
          <PitchDescription
            label="Problem"
            desc="The global agricultural industry faces significant challenges in
            meeting the growing demand for food, materials, and resources in a
            sustainable and efficient manner..."
          />

          <PitchDescription
            label="Solution"
            desc="Future Plant offers an innovative approach to agriculture by
            developing smart plants that can be remotely monitored and
            controlled through sensors and artificial intelligence..."
          />

          <PitchDescription
            label="Opportunity"
            desc="Future Plant is still in its early stages, but the company has
            already made significant progress..."
          />

          <PitchDescription
            label="Business Model"
            desc="Future Plant operates a hybrid business model that combines
            technology development, product sales, and partnerships..."
          />
        </div>
      </div>
    </div>
  );
};

export default Pitch;

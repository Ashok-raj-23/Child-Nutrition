// import { ProgressBar } from 'react-bootstrap';

import { NutritionProgress } from "./NutritionProgress";

export function NutritionDashboard({ user }) {
    return (
        <div style={{ width: "50%", margin: "auto", paddingTop: "20px" }}>
            <h2>Nutrition Progress</h2>
            <NutritionProgress label="Protein" percentage={(user.totalProtein / 51 * 100).toFixed(2)} />
            <NutritionProgress label="Carbs" percentage={(user.totalCarbs / 200 * 100).toFixed(2)} />
            <NutritionProgress label="Fat" percentage={(user.totalFat / 70 * 100).toFixed(2)} />
            <NutritionProgress label="Fiber" percentage={(user.totalFiber / 30 * 100).toFixed(2)} />
            <NutritionProgress label="Overall Achievement" percentage={(user.overallPercentage)} />
        </div>
    );
}

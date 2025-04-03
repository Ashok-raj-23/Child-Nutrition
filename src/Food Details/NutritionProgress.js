// import ProgressBar from 'react-bootstrap/ProgressBar';

export function NutritionProgress({ label, percentage }) {
    console.log(typeof(percentage));
    
    return (
        <div style={{ marginBottom: '15px' }}>
            
            <h5>{label}</h5>
            { percentage &&
            // <ProgressBar now={percentage} label={`${percentage}%`} variant="primary" />
            <input type='range' value={percentage} readOnly /> 
            
            }
        </div>
    );
}


import "./styles/Slider.css";

export default function Slider(props) {
  const { min, max, value, setValue, data } = props;
  const getBackgroundSize = () => {
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` };
  };
  return (
    <div className="slider-container">
      <span className="slider-info">{data}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={getBackgroundSize()}
        className="slider"
        list="slider-options"
      />
      <span className="slider-value">{value}</span>
    </div>
  );
}

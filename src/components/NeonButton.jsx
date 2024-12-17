import './NeonButton.css';

const NeonButton = ({ text, onClick, disabled, color }) => {
    return <>
    <button className={disabled ? 'NeonButton' : 'NeonButton hover'} disabled={disabled}  
        onClick={onClick} style={{'--clr': disabled ? '#eee' : color, background: disabled ? '#eee' : color}}>
        <span>
            {text}
        </span>
        <i></i>
    </button>
    </>;
}

export default NeonButton;
export default function Die(props) {
    return (
        <button style={{ backgroundColor: props.isHeld ? "green" : "white" }} onClick={props.hold}>
            {props.value}
        </button>
    )
}
function FormattedDate(props){
    return(
        <div className="Comment-date">{props.author.date.toLocaleString()}</div>
    )
}
export default FormattedDate
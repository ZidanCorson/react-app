

function ListGroup() {
    const items = ['New York', 'San Francisco', 'Tokyo', 'Paris', 'London'];
    
    
    return (
    <>
        <h1>List</h1>
        <ul className="list-group">
        {items.map(item => (
            <li key={item}>{item}</li>
            ))}
        </ul>
    </>
  );
}
export default ListGroup;

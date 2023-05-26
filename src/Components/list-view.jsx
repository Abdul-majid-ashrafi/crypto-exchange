import Accordion from "react-bootstrap/Accordion";

function ListView(props) {
  return (
    <div className="container mt-4">
      <Accordion defaultActiveKey="0">
        {
          props.blogs.map((blog, i) => {
            return (
              <Accordion.Item key={i} eventKey={i}>
              <Accordion.Header>{blog.title}</Accordion.Header>
              <Accordion.Body>
                {blog.description}
              </Accordion.Body>
            </Accordion.Item>
            )
          })
        }
      </Accordion>
    </div>
  );
}

export default ListView;

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { ErrorAlert, SuccessAlert } from '../UI/Assest';

function BlogComponent() {
    const [blogs, setBlogs] = useState([]);
    const [editMode, setEditMode] = useState();
    const [currentBlog, setCurrentBlog] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (!localStorage.getItem("loggedInUser")) {
            window.location.href = "/";
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("loggedInUser")));
            let localStorageBlogs = localStorage.getItem("blogs");
            if (localStorageBlogs) {
                localStorageBlogs = JSON.parse(localStorageBlogs);
            } else {
                localStorageBlogs = [];
            }
            setBlogs(localStorageBlogs);
        }
    }, []);

    const getData = () => {
        setBlogs(JSON.parse(localStorage.getItem("blogs")));
    }

    const removeBlog = (idx) => {
        blogs.splice(idx, 1);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        getData();
    }

    return (
        <div className="form">
            <h1>Blogs</h1>
            <BlogForm cb={getData} editMode={editMode} setEditMode={setEditMode} setCurrentBlog={setCurrentBlog} currentBlog={currentBlog} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Sub title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, idx) => {
                        return <tr key={idx}>
                            <td>{blog.id}</td>
                            <td>
                                {blog.editMode ?
                                    <input type="text" />
                                    :
                                    blog.title
                                }
                            </td>
                            <td>
                                {blog.editMode ?
                                    <input type="text" />
                                    :
                                    blog.subTitle
                                }
                            </td>
                            <td>{currentUser.username}</td>
                            <td>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                    <Button variant="primary" type="submit" onClick={() => { setEditMode(true); setCurrentBlog(blog) }}>
                                        Edit
                                    </Button>

                                    <Button variant="primary" type="submit" onClick={() => { removeBlog(idx) }}>
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    );
}


function BlogForm({ cb, editMode, setEditMode, currentBlog, setCurrentBlog }) {
    const [openModal, setOpenModal] = useState(false);
    const [blog, setBlog] = useState({
        title: "",
        subTitle: "",
    });

    const handleClose = () => {
        setOpenModal(false);
        if (editMode) {
            setEditMode(false);
            setCurrentBlog({});
        }
    };

    const handleShow = () => setOpenModal(true);
    const [alertType, setAlertType] = useState({ isSuccess: false, isFailed: false, message: null });

    useEffect(() => {
        if (editMode) {
            handleShow();
            setBlog({ ...currentBlog });
        }
    }, [editMode]);

    const addBlog = (e) => {
        try {
            e.preventDefault();
            let user = localStorage.getItem("loggedInUser");
            if (!user) {
                // redirect to homepage
                window.location.href = "/";
            }
            if (editMode) {
                const blogs = JSON.parse(localStorage.getItem("blogs"));
                blogs.find((bg, i) => {
                    if (bg.id === currentBlog.id) {
                        blogs[i] = { ...currentBlog, ...blog };
                        return true; // stop searching
                    }
                });
                localStorage.setItem("blogs", JSON.stringify(blogs));
                setAlertType({ isFailed: false, message: "Updated successfully", isSuccess: true });
                setTimeout(() => {
                    setBlog({ title: "", subTitle: "" });
                    setAlertType({ isSuccess: false, message: null, isFailed: false });
                    handleClose();
                    // for get real time data
                    cb();
                }, 1500);
            } else {
                setAlertType({ isSuccess: false, message: null, isFailed: false });
                if (!blog.title) {
                    setAlertType({ isSuccess: false, message: "Title is requried", isFailed: true })
                } else if (!blog.subTitle) {
                    setAlertType({ isSuccess: false, message: "Subtitle is requried", isFailed: true })
                } else {
                    let localStorageBlogs = localStorage.getItem("blogs");
                    if (localStorageBlogs) {
                        localStorageBlogs = JSON.parse(localStorageBlogs);
                    } else {
                        localStorageBlogs = [];
                    }
                    localStorageBlogs.push({ ...blog, id: Date.now() });
                    localStorage.setItem("blogs", JSON.stringify(localStorageBlogs));
                    setAlertType({ isFailed: false, message: "Added successfully", isSuccess: true });
                    setTimeout(() => {
                        setBlog({ title: "", subTitle: "" });
                        setAlertType({ isSuccess: false, message: null, isFailed: false });
                        handleClose();
                        // for get real time data
                        cb();
                    }, 1500);
                }
            }
        } catch (error) {
            console.error("got an error on addBlog page", error);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="bi-plus"></i> Add
            </Button>
            <Modal show={openModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Blog</Modal.Title>
                </Modal.Header>
                {alertType.isSuccess ? <SuccessAlert msg={alertType.message} /> : null}
                {alertType.isFailed ? <ErrorAlert msg={alertType.message} /> : null}
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required type="text" value={blog.title} placeholder="Add title" onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sub title</Form.Label>
                            <Form.Control type="text" required value={blog.subTitle} placeholder="Add sub title" onChange={(e) => setBlog({ ...blog, subTitle: e.target.value })} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addBlog}>
                        {editMode ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default BlogComponent;
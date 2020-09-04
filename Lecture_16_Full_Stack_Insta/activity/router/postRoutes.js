app.route("/api/v1/post").get(getAllPost).post(createPost);
app.route("/api/v1/post/:uid").get(getPost).patch(updatePost).delete(deletePost);
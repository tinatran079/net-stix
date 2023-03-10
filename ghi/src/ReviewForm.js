import { useEffect, useState } from "react";
import { getAccountId, useToken, getUser } from "./auth";
import { useParams } from "react-router-dom";

function ReviewForm({ getReviews }) {
  const [game, setGame] = useState([]);
  const [token] = useToken();
  const [accountId, setAccountId] = useState(0);
  const [username, setUsername] = useState("");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    account_id: 0,
    game_id: 0,
    game_title: "",
    username: "",
  });

  useEffect(() => {
    getAccountInfo();
    getGame();
    getUsername();
  }, []);

  const getAccountInfo = async () => {
    const account_id = await getAccountId();
    setAccountId(account_id);
  };

  const getGame = async () => {
    const response = await fetch(`http://localhost:8000/api/games/${id}`);
    const data = await response.json();
    setGame(data);
  };

  const getUsername = async () => {
    const username = await getUser();
    setUsername(username);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.account_id = accountId;
    formData.game_id = game.id;
    formData.game_title = game.name;
    formData.username = username;
    const ReviewUrl = "http://localhost:8000/api/reviews";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(ReviewUrl, fetchConfig);
    if (response.ok) {
      const newReview = await response.json();
      setFormData({
        subject: "",
        description: "",
        account_id: formData.account_id,
        game_id: formData.game_id,
        game_title: formData.game_title,
        username: formData.username,
      });
    }
    getReviews();
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h2>Create a new Review</h2>
          <form onSubmit={handleSubmit} id="create-Review-form">
            <div className="form-floating mb-3">
              <h2>Title</h2>
              <input
                onChange={handleFormChange}
                value={formData.subject}
                required
                type="text"
                name="subject"
                className="form-control"
              />
            </div>

            <div className="form-floating mb-3">
              <h2>Description</h2>
              <input
                onChange={handleFormChange}
                value={formData.description}
                required
                type="text"
                name="description"
                className="form-control"
              />
            </div>

            <button className="btn btn-dark">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;

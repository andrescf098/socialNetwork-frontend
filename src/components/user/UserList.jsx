import { Global } from "../../helpers/Global";
import { fetchHelper } from "../../helpers/fetchHelper";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";
import PropTypes from "prop-types";
import * as jose from "jose";

const UserList = ({
  nextPage,
  users,
  following,
  setFollowing,
  more,
  token,
}) => {
  const { auth, refreshCounters } = useAuth();
  const user = jose.decodeJwt(token);

  const follow = async (userId) => {
    const body = { idFollowed: userId };
    try {
      await fetchHelper(
        `${Global.url}follow`,
        "POST",
        JSON.stringify(body),
        token
      );
      setFollowing([...following, userId]);
      refreshCounters(user, token);
    } catch (error) {
      console.error(error);
    }
  };

  const unfollow = async (userId) => {
    try {
      await fetchHelper(
        `${Global.url}follow/unfollow/${userId}`,
        "DELETE",
        {},
        token
      );
      setFollowing(
        following.filter((followingUserId) => followingUserId !== userId)
      );
      refreshCounters(user, token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {users?.map((user) => {
        return (
          <div key={user._id}>
            {auth._id != user._id ? (
              <article className="content__posts">
                <div className="posts__post">
                  <div className="post__container">
                    <div className="post__image-user">
                      <a className="post__image-link">
                        <img
                          src={
                            user.image != "userImage.png"
                              ? `${Global.url}users/avatar/${user.image}`
                              : avatar
                          }
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      </a>
                    </div>
                    <div className="post__body">
                      <div className="post__user-info">
                        <NavLink
                          to={`/social/profile/${user._id}`}
                          className="user-info__name"
                        >
                          {user.name} {user.lastname}
                        </NavLink>
                        <span className="user-info__divider"> | </span>
                        <a className="user-info__create-date">
                          {user.createAt}
                        </a>
                      </div>
                      <h4 className="post__content">{user?.biography}</h4>
                    </div>
                  </div>
                  <div className="post__buttons">
                    {!following.includes(user._id) ? (
                      <button
                        className="post__button post__button--green"
                        onClick={() => follow(user._id)}
                      >
                        Seguir
                      </button>
                    ) : (
                      ""
                    )}
                    {following.includes(user._id) ? (
                      <button
                        className="post__button"
                        onClick={() => unfollow(user._id)}
                      >
                        Dejar de seguir
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </article>
            ) : (
              <article className="content__posts">
                <div className="posts__post">
                  <div className="post__container">
                    <div className="post__image-user">
                      <a className="post__image-link">
                        <img
                          src={
                            user.image != "userImage.png"
                              ? `${Global.url}users/avatar/${user.image}`
                              : avatar
                          }
                          className="post__user-image"
                          alt="Foto de perfil"
                        />
                      </a>
                    </div>
                    <div className="post__body">
                      <div className="post__user-info">
                        <NavLink
                          to={`/social/profile/${user._id}`}
                          className="user-info__name"
                        >
                          {user.name} {user.lastname}
                        </NavLink>
                        <span className="user-info__divider"> | </span>
                        <a className="user-info__create-date">
                          {user.createAt}
                        </a>
                      </div>
                      <h4 className="post__content">{user?.biography}</h4>
                    </div>
                  </div>
                </div>
              </article>
            )}
          </div>
        );
      })}
      {more ? (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas personas
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

UserList.propTypes = {
  nextPage: PropTypes.func,
  users: PropTypes.array,
  following: PropTypes.array,
  setFollowing: PropTypes.any,
  more: PropTypes.bool,
  token: PropTypes.string,
};

export default UserList;

import { NavLink } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import avatar from '../../assets/img/user.png';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';

const PublicationList = ({ publications, more, nextPage }) => {
  return (
    <div>
      {publications?.map((publication, index) => {
        return (
          <div key={index}>
            <article className='content__posts'>
              <div className='posts__post'>
                <div className='post__container'>
                  <div className='post__image-user'>
                    <a className='post__image-link'>
                      <img
                        src={
                          publication.user.image != 'userImage.png'
                            ? `${Global.url}users/avatar/${publication.user.image}`
                            : avatar
                        }
                        className='post__user-image'
                        alt='Foto de perfil'
                      />
                    </a>
                  </div>
                  <div className='post__body'>
                    <div className='post__user-info'>
                      <NavLink
                        to={`/social/profile/${publication.user._id}`}
                        className='user-info__name'
                      >
                        {publication.user.name} {publication.user.lastname}
                      </NavLink>
                      <span className='user-info__divider'> | </span>
                      <a className='user-info__create-date'>
                        <ReactTimeAgo
                          date={publication.createAt}
                          locale='es-CO'
                        />
                      </a>
                    </div>
                    <h4 className='post__content'>{publication.text}</h4>
                    {publication?.file ? (
                      <img
                        src={`${Global.url}publication/image/${publication.file}`}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}
      {more ? (
        <div className='content__container-btn'>
          <button className='content__btn-more-post' onClick={nextPage}>
            Ver mas publicaciones
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

PublicationList.propTypes = {
  publications: PropTypes.array,
  user: PropTypes.array,
  more: PropTypes.bool,
  nextPage: PropTypes.func,
};

export default PublicationList;

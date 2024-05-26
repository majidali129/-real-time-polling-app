/* eslint-disable react/prop-types */

const Avatar = ({ avatar }) => {
  return (
    <figure className="w-7 h-7 rounded-full outline-1 outline-blue-600">
      <img
        src={avatar}
        alt="user-avatar"
        className="w-full h-full rounded-full"
      />
    </figure>
  );
};

export default Avatar;

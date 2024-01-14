import { Avatar, Stack } from "@mui/material";
import { PropAvatar } from "../../type";
import AvatarDefault from "../../assets/image/userImg.jpg";

function stringToColor(string: string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const AvatarUser = (props: PropAvatar) => {
  const { onClick, user, size } = props;
  return (
    <Stack direction="row" spacing={2} onClick={onClick} className="">
      {user?.avatar ? (
        <Avatar alt="" src={user?.avatar} sx={{ width: size, height: size }} />
      ) : user?.lastName ? (
        <Avatar
          {...stringAvatar(user?.lastName || "")}
          sx={{ width: size, height: size }}
        />
      ) : (
        <Avatar alt="" src={AvatarDefault} sx={{ width: size, height: size }} />
      )}
    </Stack>
  );
};

export default AvatarUser;

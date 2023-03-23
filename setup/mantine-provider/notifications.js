import { showNotification } from "@mantine/notifications";
import { FiAlertCircle } from "@react-icons/all-files/fi/FiAlertCircle";
import { FiBell } from "@react-icons/all-files/fi/FiBell";
import { FiCheck } from "@react-icons/all-files/fi/FiCheck";
import { FiX } from "@react-icons/all-files/fi/FiX";
import PropTypes from "prop-types";

const defaultSettings = {
	disallowClose: false,
	autoClose: 3000,
	title: "Thông báo",
};

const defaultTheme = (theme) => ({
  root: {
    backgroundColor: theme.white,
    borderColor: theme.gray,
    "&::before": { backgroundColor: theme.white },
  },
  title: { color: theme.black },
  description: { color: theme.black },
  closeButton: {
    color: theme.black,
    // "&:hover": { backgroundColor: theme.colors.main[1] },
  },
});

const availableAlertTypes = ["success", "error", "warning", "info"];
const alertTypeStyles = {
	success: {
		color: "green",
		icon: <FiCheck />,
	},
	error: {
		color: "red",
		icon: <FiX />,
	},
	warning: {
		color: "orange",
		icon: <FiAlertCircle />,
	},
	info: {
		color: "blue",
		icon: <FiBell />,
	},
};

export const appAlert = ({
	type = "info",
	id,
	onClose = () => {},
	// onOpen = () => {},
	message,
	...props
}) => {
	if (!availableAlertTypes.includes(type)) {
		type = "info";
	}

	showNotification({
		...defaultSettings,
		id,
		onClose,
		// onOpen,
		message,
		color: alertTypeStyles[type].color,
		icon: alertTypeStyles[type].icon,
		loading: false,
		styles: (theme) => defaultTheme(theme),
		...props,
	});
};

appAlert.propTypes = {
	type: PropTypes.oneOf(availableAlertTypes),
};

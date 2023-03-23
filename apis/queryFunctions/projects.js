import { useQuery, useQueryClient } from "@tanstack/react-query";
import { asyncGetItem, asyncGetList } from "../fetch";
import projectKeys from "../queryKeys/projectKeys";

export const fetchProject = async (idProject, options = {}) => {
	let data = await asyncGetItem({
		collection_name: "news",
		options: {
			shared: true,
			...options,
			condition: {
				ma_trang: idProject,
				status: true,
				shared: true,
				ngon_ngu: "vi",
				...(options?.condition || {}),
			},
		},
	});

	return data;
};

export const fetchProjects = async (list, options = {}) => {
	return await asyncGetList({
		collection_name: "news",
		options: {
			...options,
			condition: {
				// ma_loai_tin_tuc: "thong-tin-trang",
				// ma_trang: { $in: [...list] },
				status: true,
				shared: true,
				ngon_ngu: "vi",
				...(options?.condition || {}),
			},
		},
	});
};
export const fetchProjectList = async (options = {}) => {
	return await asyncGetList({
		collection_name: "news",
		options: {
			...options,
			condition: {
				// ma_loai_tin_tuc: "thong-tin-trang",
				// ma_trang: { $in: [...list] },
				status: true,
				shared: true,
				ngon_ngu: "vi",
				...(options?.condition || {}),
			},
		},
	});
};

export const useFetchProject = (idProject, options = {}) => {
	return useQuery(
		projectKeys.detail(idProject, options),
		() => fetchProject(idProject, options),
		{
			staleTime: process.env.DEFAULT_STALE_TIME,
			enabled: !!idProject,
		}
	);
};

export const useFetchProjects = (list, options = {}) => {
	const queryClient = useQueryClient();

	return useQuery(
		projectKeys.list(list, options),
		() => fetchProjects(list, options),
		{
			staleTime: process.env.DEFAULT_STALE_TIME,
			enabled: !list,
			onSuccess: (projects) => {
				projects.map((project) => {
					queryClient.setQueriesData(
						projectKeys.detail(project.ma_trang, options),
						project
					);
				});
			},
		}
	);
};
export const useFetchProjectList = (options) => {
	const queryClient = useQueryClient();

	return useQuery(projectKeys.list(options), () => fetchProjectList(options), {
		staleTime: process.env.DEFAULT_STALE_TIME,
		enabled: !!options,
		onSuccess: (projects) => {
			projects.map((project) => {
				queryClient.setQueriesData(
					projectKeys.detail(project.ma_trang, options),
					project
				);
			});
		},
	});
};

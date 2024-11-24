import Layout from "../layout";
import Boards from "../pages/Boards";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                children: [
                    {
                        path: "",
                        element: <Boards />
                    },
                ],
            },
        ],
    },
];

export default routes;

import React from "react";

import { Treemap, ResponsiveContainer } from "recharts";

const TreeMapChartCus = ({ data, dataKey }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <Treemap
                width={800}
                height={300}
                data={data}
                dataKey={dataKey}
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
            />
        </ResponsiveContainer>
    );
};
export default TreeMapChartCus;

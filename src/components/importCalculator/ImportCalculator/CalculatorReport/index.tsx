import { Card, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { FC } from "react";

const ItemsSummaryGraph = dynamic(() => import("./ItemsSummaryGraph"), { ssr: false });
const LotReport = dynamic(() => import("./LotReport"), { ssr: false });

export const CalculatorReport: FC = () => (
    <Stack component={Card} p={2} elevation={0} variant="outlined" gap={2}>
      <Typography variant="h6" fontWeight={600} sx={{ textTransform: "uppercase" }}>
        Costos de Lote
      </Typography>

      <LotReport />

      <ItemsSummaryGraph />
    </Stack>
  );

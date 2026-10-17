import React from "react";
import { Helmet } from "react-helmet-async";
import { AboutMeData } from "./types";

const MetaTags: React.FC<{ info: AboutMeData }> = ({ info }) => (
  <Helmet>
    <title>{`${info.name} | ${info.role}`}</title>
    <meta name="description" content={info.introduction} />
  </Helmet>
);

export default MetaTags;

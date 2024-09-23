import {Express, RequestHandler} from "express";

type RouteHandler = Map<keyof Express, Map<string, RequestHandler[]>>;

export default RouteHandler;
import { Request, Response } from "express";
import * as authService from "./authService";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/responseUtil";
import { StatusCodes } from "http-status-codes";
import messages from "./authMessage";
import { CustomRequest } from "../../types";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const resp = await authService.loginUser(email, password);
    sendSuccessResponse(StatusCodes.CREATED, res, resp, messages.LOGIN_SUCCESS);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    sendErrorResponse(StatusCodes.UNAUTHORIZED, res, {}, errorMessage);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const resp = await authService.createUser(req.body);
    sendSuccessResponse(StatusCodes.CREATED, res, resp, messages.REGISTRATION_SUCCESS);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    sendErrorResponse(StatusCodes.UNAUTHORIZED, res, {}, errorMessage);
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { userId } = (req as unknown as CustomRequest).user;
  try {
    const resp = await authService.getUserById(userId);
    sendSuccessResponse(
      StatusCodes.CREATED,
      res,
      resp,
      messages.GET_PROFILE_SUCCESS
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    sendErrorResponse(StatusCodes.UNAUTHORIZED, res, {}, errorMessage);
  }
};

"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { setUser, clearUser } from "@/store/slices/authSlice";
import {useMeQuery} from "@/entities/user/api/user-api";

export function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const { data, isError, isSuccess } = useMeQuery();

  useEffect(() => {
    if (isSuccess && data) dispatch(setUser(data));
    if (isError) dispatch(clearUser());
  }, [isSuccess, isError, data, dispatch]);

  return null;
}

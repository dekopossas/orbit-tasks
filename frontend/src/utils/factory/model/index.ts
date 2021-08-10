// Interfaces
import { Model } from "@rematch/core";
import Config, { ModelState, genericModel } from "./types";

// Store
import store from "../../../store";
import { handleCache, handleAfter, prepareMock } from "./utils";

export default function createModel<T = genericModel>(config: Config) {
  // Cache
  const cacheIndex = handleCache(config, "index");
  const cacheShow = handleCache(config, "show");
  const cacheCreate = handleCache(config, "create");
  const cacheUpdate = handleCache(config, "update");
  const cacheDelete = handleCache(config, "delete");
}
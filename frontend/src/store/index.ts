import { init, RematchRootState } from "@rematch/core";
import createPersistPlugin from "@rematch/persist";
import models from "../models";
import requestFetch from "../utils/requestFetch";

const persistPlugin = createPersistPlugin({
	version: 2,
	whitelist: ["login", "tenant", "modules"],
});

const store = init({
	models,
	plugins: [persistPlugin, requestFetch({ blacklist: ["_persist"] })],
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type IRootState = RematchRootState<typeof models>;

declare module "react-redux" {
	interface Connect {
		<no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
			mapStateToProps: null | undefined,
			mapDispatchToProps: (dispatch: Dispatch) => TDispatchProps
		): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

		<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
			mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
			mapDispatchToProps: (dispatch: Dispatch) => TDispatchProps
		): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;
	}
}

export default store;

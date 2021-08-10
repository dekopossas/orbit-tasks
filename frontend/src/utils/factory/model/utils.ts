// Packages
import * as faker from "faker";

// Interface
import Config, { genericObject, crudTypes } from "./types";

// -------------------------------------------------
// handle After
// -------------------------------------------------

export function handleAfter(
	dispatch: any,
	data: genericObject,
	response: genericObject,
	config: Config,
	type: crudTypes
) {
	if (!config.after) return;

	const specific = config.after(dispatch)[type];
	if (specific) {
		specific(response, data);
	}

	const { general } = config.after(dispatch);
	if (general) {
		general(response, data);
	}
}

// -------------------------------------------------
// calculate endpoint
// -------------------------------------------------

export function calculateEndpoint(config: Config, type: crudTypes) {
	if (typeof config.endpoint === "string") {
		if (type === "delete" || type === "update")
			return (data: genericObject) => `${config.endpoint}/${data.id}`;

		return () => config.endpoint;
	}

	const endpoint = config.endpoint[type];
	if (endpoint) {
		if (typeof endpoint === "string") {
			if (type === "delete" || type === "update" || type === "show")
				return (data: genericObject) =>
					endpoint + (endpoint.match(/(\\|\/)$/) ? data.id : `/${data.id}`);

			return () => endpoint;
		}

		return (data: genericObject) => endpoint(data);
	}

	const { general } = config.endpoint;
	if (type === "delete" || type === "update" || type === "show")
		return (data: genericObject) =>
			general + ((general as string).match(/(\\|\/)$/) ? data.id : `/${data.id}`);

	if (typeof general === "string") return () => general;
	return (data: genericObject) => general(data);
}

// -------------------------------------------------
// calculate error message
// -------------------------------------------------

export function calculateErrorMessage(config: Config, type: crudTypes) {
	if (typeof config.messages?.error === "string") return () => config.messages?.error;

	const message = config.messages?.error ? config.messages?.error[type] : undefined;
	if (message) {
		if (typeof message === "string") return () => message;

		return (data: genericObject) => message(data);
	}

	const general = config.messages?.error?.general;
	if (general) return () => general;

	return () => "Um erro ocorreu, tente novamente mais tarde";
}

// -------------------------------------------------
// calculate message
// -------------------------------------------------

export function calculateMessage(config: Config, type: crudTypes) {
	if (typeof config.messages?.success === "string")
		return () => config.messages?.success;

	const message = config.messages?.success ? config.messages?.success[type] : undefined;
	if (message) {
		if (typeof message === "string") return () => message;

		return (data: genericObject) => message(data);
	}

	const general = config.messages?.success?.general;
	if (general) return () => general;

	return () => undefined;
}

// -------------------------------------------------
// handle cache
// -------------------------------------------------

export function handleCache(config: Config, type: crudTypes) {
	return {
		endpoint: calculateEndpoint(config, type),
		errorMessage: calculateErrorMessage(config, type),
		message: calculateMessage(config, type),
	};
}

// -------------------------------------------------
// prepare mock
// -------------------------------------------------

export function prepareMock(model?: Record<string, any>) {
	// No mock required
	if (!model) return undefined;
	//  if (!model || process.env.NODE_ENV === "production") return undefined;

	// configurations
	const fakering: Record<string, any> = {};

	Object.keys(model).forEach((key) => {
		const row = model[key];

		if (typeof row === "string") {
			const split = row.split(":");
			const method = split[0]
				.split(".")
				.reduce((prev, curr) => prev[curr], faker as any);
			const factoryargs = split.length === 2 ? split[1].split(",") : [];

			fakering[key] = () => (method ? method(...factoryargs) : model[key]);
		} else if (typeof row === "function") {
			fakering[key] = row;
		} else {
			fakering[key] = () => row;
		}
	});

	const mockMethod: any = (data: Record<string, unknown> = {}) => {
		const response: Record<string, unknown> = {};

		Object.keys(model).forEach((key) => {
			const prevalue = data[key] || fakering[key]();

			if (typeof prevalue === "function") {
				const prepare = prevalue();

				if (prepare.toString) response[key] = prepare.toString();
				else {
					Object.keys(prepare).forEach((subkey) => {
						prepare[subkey] = prepare[subkey]();
					});

					response[key] = prepare;
				}
			} else {
				response[key] = prevalue;
			}
		});

		return response;
	};

	mockMethod.index = (data: any) => {
		const models = [];
		const size = data?.size || 10;

		for (let i = 0; i < size; i++) {
			models.push(mockMethod());
		}

		return {
			data: models,
			count: Math.ceil(Math.random() * size * 10),
			size,
			page: data?.page || 1,
			totalPages: 7,
		};
	};

	return mockMethod;
}

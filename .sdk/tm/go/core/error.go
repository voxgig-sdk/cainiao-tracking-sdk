package core

type CainiaoTrackingError struct {
	IsCainiaoTrackingError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCainiaoTrackingError(code string, msg string, ctx *Context) *CainiaoTrackingError {
	return &CainiaoTrackingError{
		IsCainiaoTrackingError: true,
		Sdk:              "CainiaoTracking",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CainiaoTrackingError) Error() string {
	return e.Msg
}

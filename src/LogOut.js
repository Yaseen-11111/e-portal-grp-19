import {Button} from "react-bootstrap";
import App from "./App";


export function LogOutOp(toast) {

    toast.current.clear();
    toast.current.show({
        severity: "warn", closeable: true, sticky: true, content: (
            <div className="logout-card flex flex-column" style={{flex: "1"}}>
                <div className="text-center">
                    <i className="pi pi-exclamation-triangle" style={{fontSize: "3rem"}}></i>
                    <h4>You will be logged out</h4>
                    <p>Are you sure?</p>
                </div>
                <div className="grid">
                    <div className="col-6" style={{marginLeft: "7rem"}}>
                        <Button onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location = "#/";
                            window.location.reload();
                        }} type="button" label="Yes" className="p-button-raised p-button-success">
                            Yes
                        </Button>
                        <Button onClick={() => {
                            toast.current.clear();
                        }} type="button" label="No" className="p-button-raised p-button-danger btn-danger">
                            No
                        </Button>
                    </div>
                </div>
            </div>
        )
    });
}
export class Servicio {
    serviceId: number;
    serviceType: string;
    serviceDescription: string;
    active: boolean;

    constructor () {
        this.serviceId = 0;
        this.serviceType = '';
        this.serviceDescription = '';
        this.active = false;
    }
}
import { Vue } from "vue-class-component";
import { StatusService } from "@/interface/statusService";
import ApiService from "@/service/service";

export default class Table extends Vue {
    public services: any[] = [];
    public currentPage: number = 1;
    public itemsPerPage: number = 10;
    private intervalId: number | null = null;
    private apiService: ApiService = new ApiService();

    mounted() {
        this.loadServices();
        this.startAutoPagination();
    }

    beforeDestroy() {
        this.stopAutoPagination();
    }

    public async loadServices() {
        try {
            const response = await this.apiService.getAllServicesCleaning();
            this.services = response.map((service: any) => ({
                id: service.id,
                codportal: service.codportal,
                nomeportal: service.nomeportal,
                checkin: service.checkin,
                checkout: service.checkout,
                nomeacomodacao: service.nomeacomodacao,
                fullName: service.fullName,
                checkinOnline: service.checkinOnline,
                arrivalInfo: service.arrivalInfo
            }));
        } catch (err) {
            console.error("Erro ao carregar serviços", err);
        }
    }

    public portalIcons: { [key: string]: string } = {
        'Airbnb': require('@/assets/icons/airbnb.png'),
        'TravelStaytion.com': require('@/assets/icons/travelstaytion.png'),
        'Booking.com': require('@/assets/icons/booking.png'),
        'Pineapples': require('@/assets/icons/pineapples.png'),
    };

    public getIconForPortal(nomeportal: string): string {
        return this.portalIcons[nomeportal] || '';
    }

    public startAutoPagination() {
        this.intervalId = setInterval(() => {
            this.nextPage();
        }, 10000);
    }

    public stopAutoPagination() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    public nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        } else {
            this.currentPage = 1;
        }
    }

    public get paginatedServices() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.services.slice(startIndex, endIndex);
    }

    public get totalPages() {
        return Math.ceil(this.services.length / this.itemsPerPage);
    }

    public formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        };
        const adjustedDate = new Date(`${dateString}T00:00:00`);
        return adjustedDate.toLocaleDateString("pt-BR", options);
    }

    public translateService(service: string): string {
        return StatusService[service as keyof typeof StatusService] || service;
    }
}

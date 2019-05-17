import { Injectable } from "@angular/core";

@Injectable()
export class ExcelNodeService {

}
export class DataReportDto{
    constructor(
        public name?: string,
        public heading?: any[],
        public merges?: any[],
        public specification?: any,
        public dataset?: any[],
    ){
        this.name='';
        this.heading=[];
        this.merges=[];
        this.specification={};
        this.dataset=[];
    }
} 
export const dataExcelNode = {
  styles : {
    headerReport: {
        fill: {
            fgColor: {
                rgb: '323232'
            }
        },
        font: {
            color: {
                rgb: 'FFFFFFFF'
            },
            sz: 12,
            bold: true,
            underline: false
        },
        alignment: {
            vertical: "center",
            horizontal: "center"
        },
        border: {
            top: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            bottom: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            left: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            right: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            }
        }
    },
    headerDark: {
        fill: {
            fgColor: {
                rgb: '323232'
            }
        },
        font: {
            color: {
                rgb: 'FFFFFFFF'
            },
            sz: 12,
            bold: true,
            underline: false
        },
        border: {
            top: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            bottom: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            left: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            right: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            }
        }
    },
    fila1: {
        font: {
            color: {
                rgb: 'FF000000'
            },
            sz: 11,
            bold: false,
            underline: false
        },
        alignment: {
            vertical: "left",
            horizontal: "left"
        },
        border: {
            top: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            bottom: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            left: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            },
            right: {
                style: "thin",
                color: {
                    rgb: '404040'
                }
            }
        }
    }
  }
}
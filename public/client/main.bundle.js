webpackJsonp([0,5],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
    }
    // Get User Details With ID
    UsersService.prototype.getUserDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/users/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Create New User
    UsersService.prototype.createNewUser = function (newUser) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.post('/users/register', newUser, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Update User Profile
    UsersService.prototype.updateUser = function (id, data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.put('/users/' + id, data, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Inactiave Users With Their IDS
    UsersService.prototype.inActivateUser = function (users) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/inactivate', users, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Deactivate Users With Their IDS
    UsersService.prototype.deActivateUsers = function (users) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/activate', users, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Delete Multiple Uses With Their IDS
    UsersService.prototype.deleteUsers = function (users) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('/users/delete', users, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // Get All Users
    UsersService.prototype.getAllUsers = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.get('/users', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Get All Staff users
    UsersService.prototype.getAllStaffs = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.post('/users/staffs', { headers: headers })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Get Child Customers of customer user screen when customer logged in
    UsersService.prototype.getAllCustomers = function (companies) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.post('/users/customers', companies, { headers: headers })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Get All Staff Uses of Customer User With Store Ids assigned to company assigned to customer user
    UsersService.prototype.getStaffOfCustomer = function (stores) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.authToken = localStorage.getItem('id_token');
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.post('/users/customer_staffs', stores, { headers: headers })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return UsersService;
}());
UsersService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], UsersService);

var _a;
//# sourceMappingURL=users.service.js.map

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoresService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StoresService = (function () {
    function StoresService(http) {
        this.http = http;
    }
    StoresService.prototype.getAllStores = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/stores')
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    StoresService.prototype.saveStore = function (store) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.post('stores', store, { headers: headers })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    StoresService.prototype.getStore = function (id) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.get('stores/' + id, { headers: headers })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Get Support Office Details
    StoresService.prototype.getSupportOffice = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.post('stores/support', { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    // Update Store
    StoresService.prototype.updateStore = function (id, data) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.put('stores/' + id, data, { headers: headers })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    StoresService.prototype.deleteStore = function (stores) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('stores/delete', stores)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    StoresService.prototype.deactivateStore = function (stores) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('stores/deactivate', stores)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    StoresService.prototype.reactivateStore = function (stores) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('stores/reactivate', stores)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return StoresService;
}());
StoresService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], StoresService);

var _a;
//# sourceMappingURL=stores.service.js.map

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_retry__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
    }
    CompanyService.prototype.getAllCompanies = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/companies')
                .retry(3)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.getCompanyStructure = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies/structure', { id: id })
                .retry(3)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.getChildTree = function (ids) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies/some', { ids: ids })
                .retry(3)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.getCompaniesTree = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/companies/all')
                .retry(3)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.getCompanyDetail = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/companies/' + id)
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.createCompany = function (company) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies', { company: company })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.updateCompany = function (id, company) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put('/companies/' + id, { company: company })
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.deleteCompanies = function (companies) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies/delete', companies)
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.deactivateRoles = function (companies) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies/deactivate', companies)
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.getAllChilds = function (ids) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies/childs', ids)
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.getCompaniesWithIds = function (ids) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies/ids', ids)
                .map(function (res) { return res.json(); })
                .retry(3)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    CompanyService.prototype.reactivateRoles = function (companies) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/companies/reactivate', companies)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return CompanyService;
}());
CompanyService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], CompanyService);

var _a;
//# sourceMappingURL=company.service.js.map

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VillagesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VillagesService = (function () {
    function VillagesService(http) {
        this.http = http;
    }
    VillagesService.prototype.getAllVils = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/vils')
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    VillagesService.prototype.getVilDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/vils/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    VillagesService.prototype.saveVil = function (village) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/vils', { village: village })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    VillagesService.prototype.updateVil = function (id, village) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put('/vils/' + id, { village: village })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    VillagesService.prototype.deleteVils = function (villages) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/vils/delete', { villages: villages })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    VillagesService.prototype.deactivateVillages = function (vils) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/vils/deactivate', vils)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    VillagesService.prototype.reactivateVillages = function (vils) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/vils/reactivate', vils)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return VillagesService;
}());
VillagesService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], VillagesService);

var _a;
//# sourceMappingURL=villages.service.js.map

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RoleService = (function () {
    function RoleService(http) {
        this.http = http;
    }
    RoleService.prototype.getAllRoles = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/roles')
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RoleService.prototype.getRoleDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/roles/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RoleService.prototype.saveRole = function (role) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/roles', { role: role })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RoleService.prototype.updateRole = function (id, role) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put('/roles/' + id, { role: role })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RoleService.prototype.deleteRoles = function (roles) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/roles/delete', { roles: roles })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RoleService.prototype.deactivateRoles = function (roles) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/roles/deactivate', roles)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    RoleService.prototype.reactivateRoles = function (roles) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/roles/reactivate', roles)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return RoleService;
}());
RoleService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], RoleService);

var _a;
//# sourceMappingURL=role.service.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnittypesService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UnittypesService = (function () {
    function UnittypesService(http) {
        this.http = http;
    }
    UnittypesService.prototype.getAllUnitTypes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/unittypes')
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UnittypesService.prototype.getUnitTypeDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/unittypes/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UnittypesService.prototype.saveUnitType = function (unittype) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/unittypes', { unittype: unittype })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UnittypesService.prototype.updateUnitType = function (id, unittype) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put('/unittypes/' + id, { unittype: unittype })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UnittypesService.prototype.deleteUnitTypes = function (unittypes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/unittypes/delete', { unittypes: unittypes })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UnittypesService.prototype.deactivateUnitTypes = function (unittypes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/unittypes/deactivate', { unittypes: unittypes })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UnittypesService.prototype.reactivateUnitTypes = function (unittypes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/unittypes/reactivate', { unittypes: unittypes })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return UnittypesService;
}());
UnittypesService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], UnittypesService);

var _a;
//# sourceMappingURL=unittypes.service.js.map

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.isDev = true; // Change to false before deployment
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/register');
        return this.http.post(ep, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/authenticate');
        return this.http.post(ep, user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var ep = this.prepEndpoint('users/profile');
        return this.http.get(ep, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        // console.log(this.user);
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token');
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.removeItem('id_token');
        localStorage.removeItem('user');
    };
    AuthService.prototype.prepEndpoint = function (ep) {
        if (this.isDev) {
            return ep;
        }
        else {
            return 'http://localhost:8080/' + ep;
        }
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], AuthService);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColschemasService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ColschemasService = (function () {
    function ColschemasService(http) {
        this.http = http;
    }
    ColschemasService.prototype.getAllCols = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/cols')
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.getColDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/cols/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.saveCol = function (col) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/cols', { col: col })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.updateCol = function (id, col) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put('/cols/' + id, { col: col })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.deleteCols = function (cols) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/cols/delete', { cols: cols })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.deactivateColSchemas = function (cols) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/cols/deactivate', { cols: cols })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.reactivateColSchemas = function (cols) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/cols/reactivate', { cols: cols })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.getAllAreas = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/areas/')
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.getAreaDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get('/areas/' + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.saveArea = function (area) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/areas', area)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.updateArea = function (id, area) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.put('/areas/' + id, area)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ColschemasService.prototype.deleteAreas = function (areas) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post('/areas/delete', areas)
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return ColschemasService;
}());
ColschemasService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], ColschemasService);

var _a;
//# sourceMappingURL=colschemas.service.js.map

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendremittanceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SendremittanceService = (function () {
    function SendremittanceService(http) {
        this.http = http;
    }
    SendremittanceService.prototype.sendRemittance = function (content) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            _this.http.post('/email', content, { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    return SendremittanceService;
}());
SendremittanceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], SendremittanceService);

var _a;
//# sourceMappingURL=sendremittance.service.js.map

/***/ }),
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        if (user.name === undefined || user.email === undefined || user.username === undefined || user.password === undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    return ValidateService;
}());
ValidateService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ValidateService);

//# sourceMappingURL=validate.service.js.map

/***/ }),
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 111;


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(163);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(location, router) {
        var _this = this;
        this.routeState = true;
        router.events.subscribe(function (val) {
            if (location.path() !== '') {
                _this.route = location.path();
                if (_this.route === '/login') {
                    _this.routeState = true;
                }
                else {
                    _this.routeState = false;
                }
            }
            else {
                _this.route = 'Home';
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () { };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: '[app-root]',
        template: __webpack_require__(269),
        styles: [__webpack_require__(218)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* Location */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_treeview__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_loading__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_users_users_component__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_stores_stores_component__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_orders_orders_component__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_pagenotfound_pagenotfound_component__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_login_login_component__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_register_register_component__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_users_user_user_component__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_stores_store_store_component__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_navmenu_navmenu_component__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_header_header_component__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_users_createuser_createuser_component__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_users_createuser_customer_customer_component__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_users_createuser_staff_staff_component__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_main_main_component__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_users_user_staff_staff_component__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_users_user_customer_customer_component__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_validate_service__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_role_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_villages_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__services_colschemas_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__services_unittypes_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_sendremittance_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_stores_createstore_createstore_component__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_role_role_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__components_role_editrole_editrole_component__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_role_createrole_createrole_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__components_company_company_component__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__components_company_editcompany_editcompany_component__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__components_blank_blank_component__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__components_orders_createorder_createorder_component__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__components_profile_profile_component__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__components_profile_staff_staff_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__components_profile_customer_customer_component__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__components_profile_super_super_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__components_settings_villages_villages_component__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__components_settings_unittype_unittype_component__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__components_settings_colschema_colschema_component__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__components_settings_villages_createvil_createvil_component__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__components_settings_villages_editvil_editvil_component__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__components_settings_unittype_createunit_createunit_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__components_settings_unittype_editunit_editunit_component__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__components_settings_colschema_createcol_createcol_component__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__components_settings_colschema_editcol_editcol_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__components_company_createcompany_createcompany_component__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__components_forgotpassword_forgotpassword_component__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__components_stores_supportoffice_supportoffice_component__ = __webpack_require__(154);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























// Services



































var appRoutes = [
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'roles', component: __WEBPACK_IMPORTED_MODULE_37__components_role_role_component__["a" /* RoleComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'users', component: __WEBPACK_IMPORTED_MODULE_9__components_users_users_component__["a" /* UsersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'user/:id', component: __WEBPACK_IMPORTED_MODULE_15__components_users_user_user_component__["a" /* UserComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'create', component: __WEBPACK_IMPORTED_MODULE_19__components_users_createuser_createuser_component__["a" /* CreateuserComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'store/:id', component: __WEBPACK_IMPORTED_MODULE_16__components_stores_store_store_component__["a" /* StoreComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'createstore', component: __WEBPACK_IMPORTED_MODULE_36__components_stores_createstore_createstore_component__["a" /* CreatestoreComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'stores', component: __WEBPACK_IMPORTED_MODULE_10__components_stores_stores_component__["a" /* StoresComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'orders', component: __WEBPACK_IMPORTED_MODULE_11__components_orders_orders_component__["a" /* OrdersComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'orders/create', component: __WEBPACK_IMPORTED_MODULE_43__components_orders_createorder_createorder_component__["a" /* CreateorderComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_14__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'role/:id', component: __WEBPACK_IMPORTED_MODULE_38__components_role_editrole_editrole_component__["a" /* EditroleComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'companies', component: __WEBPACK_IMPORTED_MODULE_40__components_company_company_component__["a" /* CompanyComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'companies/create', component: __WEBPACK_IMPORTED_MODULE_57__components_company_createcompany_createcompany_component__["a" /* CreatecompanyComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'companies/:id', component: __WEBPACK_IMPORTED_MODULE_41__components_company_editcompany_editcompany_component__["a" /* EditcompanyComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'createrole', component: __WEBPACK_IMPORTED_MODULE_39__components_role_createrole_createrole_component__["a" /* CreateroleComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'support', component: __WEBPACK_IMPORTED_MODULE_59__components_stores_supportoffice_supportoffice_component__["a" /* SupportofficeComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'forgotpassword', component: __WEBPACK_IMPORTED_MODULE_58__components_forgotpassword_forgotpassword_component__["a" /* ForgotpasswordComponent */] },
    {
        path: 'vils',
        component: __WEBPACK_IMPORTED_MODULE_48__components_settings_villages_villages_component__["a" /* VillagesComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'vils/create',
        component: __WEBPACK_IMPORTED_MODULE_51__components_settings_villages_createvil_createvil_component__["a" /* CreatevilComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'vils/:id',
        component: __WEBPACK_IMPORTED_MODULE_52__components_settings_villages_editvil_editvil_component__["a" /* EditvilComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'uni-types',
        component: __WEBPACK_IMPORTED_MODULE_49__components_settings_unittype_unittype_component__["a" /* UnittypeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'uni-types/create',
        component: __WEBPACK_IMPORTED_MODULE_53__components_settings_unittype_createunit_createunit_component__["a" /* CreateunitComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'uni-types/:id',
        component: __WEBPACK_IMPORTED_MODULE_54__components_settings_unittype_editunit_editunit_component__["a" /* EditunitComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'col-schema',
        component: __WEBPACK_IMPORTED_MODULE_50__components_settings_colschema_colschema_component__["a" /* ColschemaComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'col-schema/create',
        component: __WEBPACK_IMPORTED_MODULE_55__components_settings_colschema_createcol_createcol_component__["a" /* CreatecolComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'col-schema/:id',
        component: __WEBPACK_IMPORTED_MODULE_56__components_settings_colschema_editcol_editcol_component__["a" /* EditcolComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]]
    },
    { path: 'blank', component: __WEBPACK_IMPORTED_MODULE_42__components_blank_blank_component__["a" /* BlankComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_13__components_login_login_component__["a" /* LoginComponent */] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_44__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: '**', redirectTo: '/404', pathMatch: 'full' },
    { path: '404', component: __WEBPACK_IMPORTED_MODULE_12__components_pagenotfound_pagenotfound_component__["a" /* PagenotfoundComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_users_users_component__["a" /* UsersComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_stores_stores_component__["a" /* StoresComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_orders_orders_component__["a" /* OrdersComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_pagenotfound_pagenotfound_component__["a" /* PagenotfoundComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_users_user_user_component__["a" /* UserComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_stores_store_store_component__["a" /* StoreComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_navmenu_navmenu_component__["a" /* NavmenuComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_users_createuser_createuser_component__["a" /* CreateuserComponent */],
            __WEBPACK_IMPORTED_MODULE_21__components_users_createuser_staff_staff_component__["a" /* StaffComponent */],
            __WEBPACK_IMPORTED_MODULE_20__components_users_createuser_customer_customer_component__["a" /* CustomerComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_main_main_component__["a" /* MainComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_users_user_staff_staff_component__["a" /* StaffEditComponent */],
            __WEBPACK_IMPORTED_MODULE_24__components_users_user_customer_customer_component__["a" /* CustomerEditComponent */],
            __WEBPACK_IMPORTED_MODULE_36__components_stores_createstore_createstore_component__["a" /* CreatestoreComponent */],
            __WEBPACK_IMPORTED_MODULE_37__components_role_role_component__["a" /* RoleComponent */],
            __WEBPACK_IMPORTED_MODULE_38__components_role_editrole_editrole_component__["a" /* EditroleComponent */],
            __WEBPACK_IMPORTED_MODULE_39__components_role_createrole_createrole_component__["a" /* CreateroleComponent */],
            __WEBPACK_IMPORTED_MODULE_40__components_company_company_component__["a" /* CompanyComponent */],
            __WEBPACK_IMPORTED_MODULE_41__components_company_editcompany_editcompany_component__["a" /* EditcompanyComponent */],
            __WEBPACK_IMPORTED_MODULE_42__components_blank_blank_component__["a" /* BlankComponent */],
            __WEBPACK_IMPORTED_MODULE_43__components_orders_createorder_createorder_component__["a" /* CreateorderComponent */],
            __WEBPACK_IMPORTED_MODULE_44__components_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_45__components_profile_staff_staff_component__["a" /* StaffProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_46__components_profile_customer_customer_component__["a" /* CustomerProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_47__components_profile_super_super_component__["a" /* SuperComponent */],
            __WEBPACK_IMPORTED_MODULE_48__components_settings_villages_villages_component__["a" /* VillagesComponent */],
            __WEBPACK_IMPORTED_MODULE_49__components_settings_unittype_unittype_component__["a" /* UnittypeComponent */],
            __WEBPACK_IMPORTED_MODULE_50__components_settings_colschema_colschema_component__["a" /* ColschemaComponent */],
            __WEBPACK_IMPORTED_MODULE_51__components_settings_villages_createvil_createvil_component__["a" /* CreatevilComponent */],
            __WEBPACK_IMPORTED_MODULE_52__components_settings_villages_editvil_editvil_component__["a" /* EditvilComponent */],
            __WEBPACK_IMPORTED_MODULE_53__components_settings_unittype_createunit_createunit_component__["a" /* CreateunitComponent */],
            __WEBPACK_IMPORTED_MODULE_54__components_settings_unittype_editunit_editunit_component__["a" /* EditunitComponent */],
            __WEBPACK_IMPORTED_MODULE_55__components_settings_colschema_createcol_createcol_component__["a" /* CreatecolComponent */],
            __WEBPACK_IMPORTED_MODULE_56__components_settings_colschema_editcol_editcol_component__["a" /* EditcolComponent */],
            __WEBPACK_IMPORTED_MODULE_57__components_company_createcompany_createcompany_component__["a" /* CreatecompanyComponent */],
            __WEBPACK_IMPORTED_MODULE_58__components_forgotpassword_forgotpassword_component__["a" /* ForgotpasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_59__components_stores_supportoffice_supportoffice_component__["a" /* SupportofficeComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { useHash: true }),
            __WEBPACK_IMPORTED_MODULE_5_ngx_treeview__["a" /* TreeviewModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["a" /* LoadingModule */].forRoot({
                animationType: __WEBPACK_IMPORTED_MODULE_6_ngx_loading__["b" /* ANIMATION_TYPES */].rectangleBounce,
                backdropBackgroundColour: 'rgba(255,255,255,0.1)',
                backdropBorderRadius: '4px',
                primaryColour: '#00bcd4',
                secondaryColour: '#ffffff',
                tertiaryColour: '#ffffff',
                fullScreenBackdrop: true
            })
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_25__services_validate_service__["a" /* ValidateService */],
            __WEBPACK_IMPORTED_MODULE_26__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_27__guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_28__services_users_service__["a" /* UsersService */],
            __WEBPACK_IMPORTED_MODULE_29__services_role_service__["a" /* RoleService */],
            __WEBPACK_IMPORTED_MODULE_31__services_company_service__["a" /* CompanyService */],
            __WEBPACK_IMPORTED_MODULE_30__services_stores_service__["a" /* StoresService */],
            __WEBPACK_IMPORTED_MODULE_32__services_villages_service__["a" /* VillagesService */],
            __WEBPACK_IMPORTED_MODULE_33__services_colschemas_service__["a" /* ColschemasService */],
            __WEBPACK_IMPORTED_MODULE_34__services_unittypes_service__["a" /* UnittypesService */],
            __WEBPACK_IMPORTED_MODULE_35__services_sendremittance_service__["a" /* SendremittanceService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlankComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BlankComponent = (function () {
    function BlankComponent() {
    }
    BlankComponent.prototype.ngOnInit = function () {
    };
    return BlankComponent;
}());
BlankComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-blank',
        template: __webpack_require__(270),
        styles: [__webpack_require__(219)]
    }),
    __metadata("design:paramtypes", [])
], BlankComponent);

//# sourceMappingURL=blank.component.js.map

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_treeview__ = __webpack_require__(47);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompanyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CompanyComponent = (function () {
    function CompanyComponent(companyServices, userService) {
        this.companyServices = companyServices;
        this.userService = userService;
        this.loading = false;
        this.config = __WEBPACK_IMPORTED_MODULE_3_ngx_treeview__["b" /* TreeviewConfig */].create({
            hasAllCheckBox: false,
            hasFilter: true,
            hasCollapseExpand: true,
            maxHeight: 400
        });
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.company_permission = this.user.special_permissions['company'];
        }
        if (this.user.role) {
            this.company_permission = this.user.role['company'];
        }
    }
    CompanyComponent.prototype.ngOnInit = function () {
        this.selectedCompanies = [];
        this.getAllCompanies();
        // this.items = [this.itCategory];
    };
    CompanyComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.loading = true;
        if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
            this.companyServices.getCompaniesTree().then(function (res) {
                _this.loading = false;
                _this.currentCompanies = res;
                var items = [];
                for (var i = 0; i < Object.keys(res).length; i++) {
                    var item = new __WEBPACK_IMPORTED_MODULE_3_ngx_treeview__["c" /* TreeviewItem */](res[i]);
                    items.push(item);
                }
                _this.items = _this.sortByKey(items, 'name');
            }, function (err) {
                console.log(err);
                _this.loading = false;
            });
        }
        if (this.user.accounttype === 'customer') {
            this.userService.getUserDetails(this.user.id).then(function (res) {
                _this.companyServices.getChildTree(res['user'].companies_assigned).then(function (respond) {
                    _this.loading = false;
                    _this.currentCompanies = respond;
                    var items = [];
                    for (var i = 0; i < Object.keys(respond).length; i++) {
                        var item = new __WEBPACK_IMPORTED_MODULE_3_ngx_treeview__["c" /* TreeviewItem */](respond[i]);
                        items.push(item);
                    }
                    _this.items = _this.sortByKey(items, 'name');
                }, function (error) {
                    _this.loading = false;
                    console.log(error);
                });
            }, function (err) {
                _this.loading = false;
                console.log(err);
            });
        }
    };
    CompanyComponent.prototype.deleteComapnies = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover selected companies!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            _this.companyServices.deleteCompanies(_this.selectedCompanies).then(function (res) {
                _this.selectedCompanies = [];
                _this.getAllCompanies();
            }, function (err) {
                console.error(err);
            });
            swal('Deleted!', 'Selected companies has been deleted.', 'success');
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    CompanyComponent.prototype.deactivateComapnies = function () {
        var _this = this;
        this.companyServices.deactivateRoles(this.selectedCompanies).then(function (res) {
            _this.getAllCompanies();
        }, function (err) {
            console.error(err);
        });
    };
    CompanyComponent.prototype.reactivateComapnies = function () {
        var _this = this;
        this.companyServices.reactivateRoles(this.selectedCompanies).then(function (res) {
            _this.getAllCompanies();
        }, function (err) {
            console.error(err);
        });
    };
    CompanyComponent.prototype.onSelectedChange = function ($event) {
        console.log($event);
    };
    CompanyComponent.prototype.selectItem = function (event) {
        if (event.target.checked) {
            this.selectedCompanies.push(event.target.value);
            console.log(this.selectedCompanies);
        }
        else {
            for (var i = 0; i < this.selectedCompanies.length; i++) {
                if (this.selectedCompanies[i] === event.target.value) {
                    this.selectedCompanies.splice(i, 1);
                }
            }
            console.log(this.selectedCompanies);
        }
    };
    // sort users ASC
    CompanyComponent.prototype.sortByKey = function (array, key) {
        return array.sort(function (a, b) {
            var x = a[key].toUpperCase();
            var y = b[key].toUpperCase();
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };
    return CompanyComponent;
}());
CompanyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-company',
        template: __webpack_require__(271),
        styles: [__webpack_require__(220)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_company_service__["a" /* CompanyService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */]) === "function" && _b || Object])
], CompanyComponent);

var _a, _b;
//# sourceMappingURL=company.component.js.map

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatecompanyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreatecompanyComponent = (function () {
    function CreatecompanyComponent(http, companyService, storeService, userService, router) {
        this.http = http;
        this.companyService = companyService;
        this.storeService = storeService;
        this.userService = userService;
        this.router = router;
        this.company = {};
        this.company_info = {};
        this.account_info = {};
        this.address = {};
        this.companies_structure = {
            'parent': '',
            'childs': []
        };
        this.child = {}; // for display company structure detail
        this.child_info = {};
        this.child_address = {};
        this.child_account = {};
        this.filesToLogo = [];
        this.assigned_staffs = [];
        this.assigned_stores = [];
        this.key_contacts = [];
        this.config = __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__["b" /* TreeviewConfig */].create({
            hasAllCheckBox: false,
            hasFilter: true,
            hasCollapseExpand: true,
            maxHeight: 400
        });
        this.regionData = {
            'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands', 'Manukau City',
                'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City',
                'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.company_permission = this.user.special_permissions['company'];
        }
        if (this.user.role) {
            this.company_permission = this.user.special_permissions['company'];
        }
    }
    CreatecompanyComponent.prototype.ngOnInit = function () {
        this.company = {
            'name': '',
            'email': '',
            'is_debtor': false
        };
        this.address = {
            'address1': '',
            'address2': ''
        };
        this.logoUrl = 'assets/images/default-logo.jpg';
        this.getAllCompanies();
        this.getAllStores();
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    // Get All Companies
    CreatecompanyComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.companyService.getAllCompanies().then(function (res) {
            _this.companies = res;
            var parents = [];
            for (var i = 0; i < _this.companies.length; i++) {
                if (!_this.companies[i].parent) {
                    parents.push(_this.companies[i].name);
                }
            }
            console.log(parents);
        }, function (err) {
            console.log(err);
        });
    };
    // Get All Stores
    CreatecompanyComponent.prototype.getAllStores = function () {
        var _this = this;
        this.storeService.getAllStores().then(function (res) {
            _this.stores = res;
        }, function (err) {
            console.log(err);
        });
    };
    CreatecompanyComponent.prototype.selectStore = function (store, event) {
        var _this = this;
        if (event.target.checked) {
            this.assigned_stores.push(store._id);
            var assigned_staffs_1 = store.assigned_users;
            this.userService.getAllStaffs().then(function (res) {
                var temp = [];
                for (var i = 0; i < Object.keys(res).length; i++) {
                    for (var j = 0; j < assigned_staffs_1.length; j++) {
                        if (res[i]._id === assigned_staffs_1[j]) {
                            temp.push({ 'id': res[i]._id, 'username': res[i].username });
                        }
                    }
                }
                var key = {
                    'store_id': store._id,
                    'store': store.store_title,
                    'assigned_staffs': temp
                };
                console.log(key);
                _this.assigned_staffs.push(key);
            }, function (err) {
                console.log(err);
            });
        }
        else {
            for (var i = 0; i < this.assigned_staffs.length; i++) {
                if (this.assigned_staffs[i].store === store.store_title) {
                    this.assigned_staffs.splice(i, 1);
                }
            }
            for (var i = 0; i < this.assigned_stores.length; i++) {
                if (this.assigned_stores[i] === store.id) {
                    this.assigned_stores.splice(i, 1);
                }
            }
        }
    };
    CreatecompanyComponent.prototype.selectParent = function (event) {
        var _this = this;
        if (event.target.value.length !== 0) {
            this.companyService.getCompanyStructure(event.target.value).then(function (res) {
                var item = new __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__["c" /* TreeviewItem */](res[0]);
                item['collapsed'] = false;
                var items = [];
                items.push(item);
                _this.items = items;
            }, function (err) {
                console.log(err);
            });
        }
    };
    CreatecompanyComponent.prototype.selectChild = function (event) {
        for (var i = 0; i < this.companies.length; i++) {
            if (this.companies[i].name === event) {
                console.log(this.companies[i]);
                this.child = this.companies[i];
                this.child_info = this.companies[i].company_info;
                this.child_address = this.companies[i].company_info.address;
                this.child_account = this.companies[i].account_info;
            }
        }
    };
    CreatecompanyComponent.prototype.selectKeyContact = function (item, event) {
        var key_contact = {
            'store': item.store_id,
            'key_staff': event.target.value
        };
        var already_existed = false;
        for (var i = 0; i < this.key_contacts.length; i++) {
            if (this.key_contacts[i].store === key_contact.store) {
                already_existed = true;
                this.key_contacts[i] = key_contact;
            }
        }
        if (!already_existed) {
            this.key_contacts.push(key_contact);
        }
    };
    // Select Region
    CreatecompanyComponent.prototype.selectRegion = function (event) {
        var region = event.target.value;
        this.cities = this.regionData[region];
    };
    CreatecompanyComponent.prototype.isDebtor = function (event) {
        if (event.target.checked) {
            this.company['is_debtor'] = true;
        }
        else {
            this.company['is_debtor'] = false;
        }
    };
    CreatecompanyComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.filesToLogo = event.target.files;
            this.logo = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event1) {
                _this.logoUrl = event1.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            this.logoChanged = true;
        }
    };
    CreatecompanyComponent.prototype.uploadLogo = function () {
        var formData = new FormData();
        var files = this.filesToLogo;
        formData.append('uploads[]', files[0], files[0]['name']);
        this.http.post('upload', formData)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); });
        this.company['logo'] = files[0]['name'];
    };
    CreatecompanyComponent.prototype.onSubmit = function () {
        var _this = this;
        this.company_info['address'] = this.address;
        this.company['company_info'] = this.company_info;
        this.company['account_info'] = this.account_info;
        this.company['key_contacts'] = this.key_contacts;
        this.company['assigned_stores'] = this.assigned_stores;
        if (this.logoChanged) {
            this.uploadLogo();
        }
        this.companyService.createCompany(this.company).then(function (res) {
            if (res['success'] === true) {
                toastr.success(res['msg']);
                _this.router.navigate(['/companies']);
            }
            else {
                toastr.error(res['msg']);
            }
        }, function (err) {
            console.log('Something went wrong!!!-->' + err);
        });
    };
    CreatecompanyComponent.prototype.cancel = function () {
        this.router.navigate(['/companies']);
    };
    return CreatecompanyComponent;
}());
CreatecompanyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createcompany',
        template: __webpack_require__(272),
        styles: [__webpack_require__(221)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_company_service__["a" /* CompanyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_stores_service__["a" /* StoresService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_users_service__["a" /* UsersService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */]) === "function" && _e || Object])
], CreatecompanyComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=createcompany.component.js.map

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_users_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditcompanyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditcompanyComponent = (function () {
    function EditcompanyComponent(route, companyService, storesService, usersService, router, http) {
        var _this = this;
        this.route = route;
        this.companyService = companyService;
        this.storesService = storesService;
        this.usersService = usersService;
        this.router = router;
        this.http = http;
        this.filesToUpload = [];
        this.company_info = {};
        this.account_info = {};
        this.address = {};
        this.config = __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__["b" /* TreeviewConfig */].create({
            hasAllCheckBox: false,
            hasFilter: true,
            hasCollapseExpand: true,
            maxHeight: 400
        });
        this.companies_structure = {
            'parent': '',
            'childs': []
        };
        this.child = {}; // for display company structure detail
        this.child_info = {};
        this.child_address = {};
        this.child_account = {};
        this.filesToLogo = [];
        this.assigned_staffs = [];
        this.assigned_stores = [];
        this.key_contacts = [];
        this.regionData = {
            'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands',
                'Manukau City', 'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua',
                'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula',
                'Christchurch City', 'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.company_permission = this.user.special_permissions['company'];
        }
        if (this.user.role) {
            this.company_permission = this.user.special_permissions['company'];
        }
        this.logoUrl = 'assets/images/default-logo.jpg';
        this.usersService.getAllStaffs().then(function (res) {
            _this.users = res;
            console.log(_this.users);
        }, function (err) {
            console.log(err);
        });
        this.getAllCompanies();
    }
    EditcompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentCompany = {
            name: '',
            status: Boolean,
        };
        this.route.params.forEach(function (params) {
            var id = params['id'];
            // this.getCompanyDetails(this.route.snapshot.params['id']);
            _this.getCompanyDetails(id);
        });
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    EditcompanyComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.companyService.getAllCompanies().then(function (res) {
            _this.companies = res;
        }, function (err) {
            console.log(err);
        });
    };
    EditcompanyComponent.prototype.getCompanyDetails = function (id) {
        var _this = this;
        this.companyService.getCompanyDetail(id).then(function (res) {
            _this.currentCompany = res;
            _this.company_info = res['company_info'];
            _this.account_info = res['account_info'];
            _this.cities = _this.regionData[_this.company_info['region']];
            _this.address = res['company_info'].address;
            _this.logoUrl = '/uploads/logo/' + res['logo'];
            _this.assigned_stores = res['assigned_stores'];
            _this.key_contacts = res['key_contacts']; // currentcompany's key contacts table
            if (_this.currentCompany.parent) {
                _this.companyService.getCompanyStructure(_this.currentCompany.parent).then(function (res) {
                    var item = new __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__["c" /* TreeviewItem */](res[0]);
                    item['collapsed'] = false;
                    var items = [];
                    items.push(item);
                    _this.items = items;
                });
            }
            if (!_this.currentCompany.parent) {
                _this.companyService.getCompanyStructure(_this.currentCompany._id).then(function (res) {
                    var item = new __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__["c" /* TreeviewItem */](res[0]);
                    item['collapsed'] = false;
                    var items = [];
                    items.push(item);
                    _this.items = items;
                });
            }
            _this.storesService.getAllStores().then(function (respond) {
                _this.stores = respond;
                for (var i = 0; i < _this.stores.length; i++) {
                    for (var j = 0; j < _this.assigned_stores.length; j++) {
                        if (_this.stores[i]._id === _this.assigned_stores[j]) {
                            _this.stores[i].checked = true;
                        }
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.error(err);
        });
    };
    EditcompanyComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.filesToUpload = event.target.files;
            this.logo = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event1) {
                _this.logoUrl = event1.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
            this.logoChanged = true;
        }
    };
    EditcompanyComponent.prototype.upload = function () {
        var formData = new FormData();
        var files = this.filesToUpload;
        formData.append('uploads[]', files[0], files[0]['name']);
        this.http.post('upload', formData)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); });
        this.currentCompany['logo'] = files[0]['name'];
    };
    EditcompanyComponent.prototype.selectStore = function (item, event) {
        if (event.target.checked) {
            var key = {
                store: item._id,
                key_staff: ''
            };
            this.assigned_stores.push(item._id);
            this.key_contacts.push(key);
        }
        else {
            for (var i = 0; i < this.assigned_stores.length; i++) {
                if (this.assigned_stores[i] === item._id) {
                    this.assigned_stores.splice(i, 1);
                }
            }
            for (var i = 0; i < this.key_contacts.length; i++) {
                if (this.key_contacts[i].store === item._id) {
                    this.key_contacts.splice(i, 1);
                }
            }
        }
    };
    EditcompanyComponent.prototype.selectParent = function (event) {
        var _this = this;
        if (event.target.value.length !== 0) {
            this.companyService.getCompanyStructure(event.target.value).then(function (res) {
                var item = new __WEBPACK_IMPORTED_MODULE_2_ngx_treeview__["c" /* TreeviewItem */](res[0]);
                item['collapsed'] = false;
                var items = [];
                items.push(item);
                _this.items = items;
            }, function (err) {
                console.log(err);
            });
        }
    };
    EditcompanyComponent.prototype.selectChild = function (event) {
        for (var i = 0; i < this.companies.length; i++) {
            if (this.companies[i].name === event) {
                console.log(this.companies[i]);
                this.child = this.companies[i];
                this.child_info = this.companies[i].company_info;
                this.child_address = this.companies[i].company_info.address;
                this.child_account = this.companies[i].account_info;
            }
        }
    };
    EditcompanyComponent.prototype.selectKeyContact = function (item, event) {
        var key_contact = {
            'store': item,
            'key_staff': event.target.value
        };
        var already_existed = false;
        for (var i = 0; i < this.key_contacts.length; i++) {
            if (this.key_contacts[i].store === key_contact.store) {
                already_existed = true;
                this.key_contacts[i] = key_contact;
            }
        }
        if (!already_existed) {
            this.key_contacts.push(key_contact);
        }
        console.log(this.key_contacts);
    };
    EditcompanyComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.logo) {
            this.upload();
        }
        this.companyService
            .updateCompany(this.currentCompany._id, this.currentCompany)
            .then(function (res) {
            if (!res['success']) {
                toastr.error(res['msg']);
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/companies']);
            }
        }, function (err) {
            console.error(err);
        });
    };
    EditcompanyComponent.prototype.cancel = function () {
        this.router.navigate(['/companies']);
    };
    return EditcompanyComponent;
}());
EditcompanyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-editcompany',
        template: __webpack_require__(273),
        styles: [__webpack_require__(222)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_stores_service__["a" /* StoresService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_users_service__["a" /* UsersService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"]) === "function" && _f || Object])
], EditcompanyComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=editcompany.component.js.map

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
        Morris.Bar({
            element: 'morris-bar',
            data: [
                {
                    x: '2011 Q1',
                    y: 3,
                    z: 2,
                    a: 3,
                },
                {
                    x: '2011 Q2',
                    y: 2,
                    z: null,
                    a: 1,
                },
                {
                    x: '2011 Q3',
                    y: 0,
                    z: 2,
                    a: 4,
                },
                {
                    x: '2011 Q4',
                    y: 2,
                    z: 4,
                    a: 3,
                },
            ],
            xkey: 'x',
            ykeys: ['y', 'z', 'a'],
            labels: ['Y', 'Z', 'A'],
        });
        Morris.Bar({
            element: 'stacked',
            data: [
                {
                    x: '2011 Q1',
                    y: 3,
                    z: 2,
                    a: 3,
                },
                {
                    x: '2011 Q2',
                    y: 2,
                    z: null,
                    a: 1,
                },
                {
                    x: '2011 Q3',
                    y: 0,
                    z: 2,
                    a: 4,
                },
                {
                    x: '2011 Q4',
                    y: 2,
                    z: 4,
                    a: 3,
                },
            ],
            xkey: 'x',
            ykeys: ['y', 'z', 'a'],
            labels: ['Y', 'Z', 'A'],
            stacked: true,
        });
        Morris.Area({
            element: 'morris-area-chart',
            data: [
                {
                    period: '2010',
                    iphone: 50,
                    ipad: 80,
                    itouch: 20,
                },
                {
                    period: '2011',
                    iphone: 130,
                    ipad: 100,
                    itouch: 80,
                },
                {
                    period: '2012',
                    iphone: 80,
                    ipad: 60,
                    itouch: 70,
                },
                {
                    period: '2013',
                    iphone: 70,
                    ipad: 200,
                    itouch: 140,
                },
                {
                    period: '2014',
                    iphone: 180,
                    ipad: 150,
                    itouch: 140,
                },
                {
                    period: '2015',
                    iphone: 105,
                    ipad: 100,
                    itouch: 80,
                },
                {
                    period: '2016',
                    iphone: 250,
                    ipad: 150,
                    itouch: 200,
                },
            ],
            xkey: 'period',
            ykeys: ['iphone', 'ipad', 'itouch'],
            labels: ['iPhone', 'iPad', 'iPod Touch'],
            pointSize: 3,
            fillOpacity: 0,
            pointStrokeColors: ['#00bfc7', '#fdc006', '#9675ce'],
            behaveLikeLine: true,
            gridLineColor: '#e0e0e0',
            lineWidth: 1,
            hideHover: 'auto',
            lineColors: ['#00bfc7', '#fdc006', '#9675ce'],
            resize: true,
        });
        //// Area Chart
        Morris.Area({
            element: 'morris-area-chart2',
            data: [
                {
                    period: '2010',
                    SiteA: 0,
                    SiteB: 0,
                },
                {
                    period: '2011',
                    SiteA: 130,
                    SiteB: 100,
                },
                {
                    period: '2012',
                    SiteA: 80,
                    SiteB: 60,
                },
                {
                    period: '2013',
                    SiteA: 70,
                    SiteB: 200,
                },
                {
                    period: '2014',
                    SiteA: 180,
                    SiteB: 150,
                },
                {
                    period: '2015',
                    SiteA: 105,
                    SiteB: 90,
                },
                {
                    period: '2016',
                    SiteA: 250,
                    SiteB: 150,
                },
            ],
            xkey: 'period',
            ykeys: ['SiteA', 'SiteB'],
            labels: ['Site A', 'Site B'],
            pointSize: 0,
            fillOpacity: 0.4,
            pointStrokeColors: ['#b4becb', '#01c0c8'],
            behaveLikeLine: true,
            gridLineColor: '#e0e0e0',
            lineWidth: 0,
            smooth: false,
            hideHover: 'auto',
            lineColors: ['#b4becb', '#01c0c8'],
            resize: true,
        });
        // Line Chart
        new Morris.Line({
            // ID of the element in which to draw the chart.
            element: 'myfirstchart',
            // Chart data records -- each entry in this array corresponds to a point on
            // the chart.
            data: [
                {
                    year: '2008',
                    value: 20,
                },
                {
                    year: '2009',
                    value: 10,
                },
                {
                    year: '2010',
                    value: 5,
                },
                {
                    year: '2011',
                    value: 5,
                },
                {
                    year: '2012',
                    value: 20,
                },
            ],
            // The name of the data record attribute that contains x-values.
            xkey: 'year',
            // A list of names of data record attributes that contain y-values.
            ykeys: ['value'],
            // Labels for the ykeys -- will be displayed when you hover over the
            // chart.
            labels: ['Value'],
        });
        Morris.Area({
            element: 'extra-area-chart',
            data: [
                {
                    period: '2010',
                    iphone: 0,
                    ipad: 0,
                    itouch: 0,
                },
                {
                    period: '2011',
                    iphone: 50,
                    ipad: 15,
                    itouch: 5,
                },
                {
                    period: '2012',
                    iphone: 20,
                    ipad: 50,
                    itouch: 65,
                },
                {
                    period: '2013',
                    iphone: 60,
                    ipad: 12,
                    itouch: 7,
                },
                {
                    period: '2014',
                    iphone: 30,
                    ipad: 20,
                    itouch: 120,
                },
                {
                    period: '2015',
                    iphone: 25,
                    ipad: 80,
                    itouch: 40,
                },
                {
                    period: '2016',
                    iphone: 10,
                    ipad: 10,
                    itouch: 10,
                },
            ],
            lineColors: ['#fb9678', '#01c0c8', '#8698b7'],
            xkey: 'period',
            ykeys: ['iphone', 'ipad', 'itouch'],
            labels: ['Site A', 'Site B', 'Site C'],
            pointSize: 0,
            lineWidth: 0,
            resize: true,
            fillOpacity: 0.8,
            behaveLikeLine: true,
            gridLineColor: '#e0e0e0',
            hideHover: 'auto',
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(274),
        styles: [__webpack_require__(223)],
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);

//# sourceMappingURL=dashboard.component.js.map

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotpasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ForgotpasswordComponent = (function () {
    function ForgotpasswordComponent() {
    }
    ForgotpasswordComponent.prototype.ngOnInit = function () {
    };
    return ForgotpasswordComponent;
}());
ForgotpasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-forgotpassword',
        template: __webpack_require__(275),
        styles: [__webpack_require__(224)]
    }),
    __metadata("design:paramtypes", [])
], ForgotpasswordComponent);

//# sourceMappingURL=forgotpassword.component.js.map

/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        if (!this.currentUser.logo) {
            this.logoUrl = 'assets/images/logo.png';
        }
        else {
            this.logoUrl = 'uploads/logo/' + this.currentUser.logo;
        }
        if (!this.currentUser.photo) {
            this.photoUrl = 'assets/images/photo.jpg';
        }
        else {
            this.photoUrl = 'uploads/logo/' + this.currentUser.photo;
        }
        // Minimalize menu
        $('.navbar-minimalize').on('click', function () {
            if ($(window).width() > 991) {
                $('body').toggleClass('mini-navbar');
            }
            else {
                $('body').toggleClass('mini-navbar');
            }
        });
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
        // $.material.init();
        $(function () {
            $('.scroller').slimScroll({
                height: '250px',
            });
            $('#menu').metisMenu();
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logout();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__(276),
        styles: [__webpack_require__(225)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], HeaderComponent);

var _a;
//# sourceMappingURL=header.component.js.map

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authService.loggedIn()) {
            var home_url = '';
            var user = JSON.parse(localStorage.getItem('user'));
            if (user.accounttype === 'super') {
                this.router.navigate(['/dashboard']);
            }
            if (user.accounttype === 'staff' || user.accounttype === 'customer') {
                if (user.role) {
                    home_url = this.user.role.home_url;
                }
                if (user.special_permissions) {
                    home_url = this.user.special_permissions.home_url;
                }
                this.router.navigate([home_url]);
            }
        }
        this.error = '';
        this.remember_me = false;
        this.validateRemember();
    };
    LoginComponent.prototype.validateRemember = function () {
        var remember_token = JSON.parse(localStorage.getItem('remember_token'));
        if (remember_token) {
            this.username = remember_token.username;
            this.password = remember_token.password;
        }
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {};
        this.loading = true;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.username)) {
            user['email'] = this.username;
            user['password'] = this.password;
        }
        else {
            user['username'] = this.username;
            user['password'] = this.password;
        }
        // Remember Me
        if (this.remember_me) {
            localStorage.setItem('remember_token', JSON.stringify(user));
        }
        else {
            localStorage.removeItem('remember_token');
        }
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                _this.loading = false;
                _this.authService.storeUserData(data.token, data.user);
                _this.user = JSON.parse(localStorage.getItem('user'));
                // if user's accounttype is super admin
                if (_this.user.accounttype === 'super') {
                    _this.router.navigate(['/dashboard']);
                }
                if (_this.user.accounttype === 'staff' || _this.user.accounttype === 'customer') {
                    if (!_this.user.role) {
                        if (!_this.user.special_permissions) {
                            _this.router.navigate(['/blank']);
                        }
                        else {
                            _this.router.navigate([
                                '/' + _this.user.special_permissions.home_url,
                            ]);
                        }
                    }
                    else {
                        if (_this.user.role.status !== true) {
                            _this.router.navigate(['/blank']);
                        }
                        else {
                            if (!_this.user.role.home_url) {
                                _this.router.navigate(['/dashboard']);
                            }
                            else {
                                _this.router.navigate(['/' + _this.user.role.home_url]);
                            }
                        }
                    }
                }
                // this.router.navigate([this.user.role.home_url]);
            }
            else {
                _this.router.navigate(['login']);
                _this.loading = false;
                _this.error = data.msg;
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(277),
        styles: [__webpack_require__(226)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    return MainComponent;
}());
MainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-main',
        template: __webpack_require__(278),
        styles: [__webpack_require__(227)]
    }),
    __metadata("design:paramtypes", [])
], MainComponent);

//# sourceMappingURL=main.component.js.map

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(19);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavmenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavmenuComponent = (function () {
    function NavmenuComponent(router, location) {
        var _this = this;
        this.router = router;
        this.activatedRoute = '/dashboard';
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.staff_permission = this.user.special_permissions['staff'];
            this.customer_permission = this.user.special_permissions['customer'];
            this.store_permission = this.user.special_permissions['store'];
            this.order_permission = this.user.special_permissions['order'];
            this.role_permission = this.user.special_permissions['role'];
            this.company_permission = this.user.special_permissions['company'];
            this.display_dashboard = this.user.special_permissions['display_dashboard'];
        }
        if (this.user.role) {
            this.staff_permission = this.user.role['staff'];
            this.customer_permission = this.user.role['customer'];
            this.store_permission = this.user.role['store'];
            this.order_permission = this.user.role['order'];
            this.role_permission = this.user.role['role'];
            this.company_permission = this.user.role['company'];
            this.display_dashboard = this.user.role['display_dashboard'];
        }
        router.events.subscribe(function (val) {
            if (location.path() !== '') {
                _this.activatedRoute = location.path();
            }
            else {
                _this.activatedRoute = '/dashboard';
            }
        });
    }
    NavmenuComponent.prototype.ngAfterViewInit = function () {
        $('#menu').metisMenu();
    };
    return NavmenuComponent;
}());
NavmenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navmenu',
        template: __webpack_require__(279),
        styles: [__webpack_require__(228)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["g" /* Location */]) === "function" && _b || Object])
], NavmenuComponent);

var _a, _b;
//# sourceMappingURL=navmenu.component.js.map

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_unittypes_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_colschemas_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_sendremittance_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateorderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateorderComponent = (function () {
    function CreateorderComponent(storeService, companyService, userService, unitTypeService, colSchemaService, sendRemittance) {
        this.storeService = storeService;
        this.companyService = companyService;
        this.userService = userService;
        this.unitTypeService = unitTypeService;
        this.colSchemaService = colSchemaService;
        this.sendRemittance = sendRemittance;
        this.loading = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.users = [];
        this.stores = [];
        this.store = {};
        this.store_address = {};
        this.store_info = {};
        this.companies = [];
        this.company_info = {};
        this.assigned_stores = [];
        this.key_staff = {};
        this.staff_info = {};
        this.staffs = [];
        this.areas_required = {
            'carpet': false,
            'kitchen': false,
            'bathroom': false,
            'laundry': false
        };
        this.visible_special = false;
    }
    CreateorderComponent.prototype.ngOnInit = function () {
        this.getAllCompanies();
        // this.getAllStaffs();
        // this.getChildCompanies();
        // this.getAllCols();
        // this.getAllUnitTypes();
    };
    CreateorderComponent.prototype.init = function () {
        this.store_address = {};
        this.company_info = {};
        this.key_staff = {};
        this.store = {};
        this.staff_info = {};
        this.assigned_stores = [];
    };
    // Get All Colours
    CreateorderComponent.prototype.getAllCols = function () {
        var _this = this;
        this.colSchemaService.getAllCols().then(function (res) {
            _this.colSchemas = res;
        }, function (err) {
            console.log(err);
        });
    };
    // Get All Unit Types
    CreateorderComponent.prototype.getAllUnitTypes = function () {
        var _this = this;
        this.unitTypeService.getAllUnitTypes().then(function (res) {
            _this.unitTypes = res;
        }, function (err) {
            console.log(err);
        });
    };
    CreateorderComponent.prototype.getAssignedStores = function () {
        for (var i = 0; i < this.company['assigned_stores'].length; i++) {
            for (var j = 0; j < this.stores.length; j++) {
                if (this.company['assigned_stores'][i] === this.stores[j]._id) {
                    this.assigned_stores.push(this.stores[j]);
                }
            }
        }
        if (this.assigned_stores.length === 1) {
            this.store = this.assigned_stores[0];
            this.store_address = this.assigned_stores[0]['store_info'].address;
            this.store_info = this.assigned_stores[0]['store_info'];
            this.getKeyContact();
        }
    };
    // Get All Companies
    CreateorderComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.loading = true;
        this.companyService.getAllCompanies().then(function (res) {
            _this.companies = res;
            _this.getAllStores();
        }, function (err) {
            console.log(err);
        });
    };
    ;
    CreateorderComponent.prototype.getAllStores = function () {
        var _this = this;
        this.storeService.getAllStores().then(function (res) {
            _this.stores = res;
            _this.getAllUsers();
        }, function (err) {
            console.log(err);
        });
    };
    // Get All Staffs
    CreateorderComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.userService.getAllUsers().then(function (res) {
            _this.users = res;
            _this.getAllStaffs();
        }, function (err) {
            console.log(err);
        });
    };
    // Get All Users
    CreateorderComponent.prototype.getAllStaffs = function () {
        var _this = this;
        this.userService.getAllStaffs().then(function (res) {
            _this.staffs = res;
            _this.loading = false;
            _this.getChildCompanies();
        }, function (err) {
            console.log(err);
        });
    };
    CreateorderComponent.prototype.getChildCompanies = function () {
        var _this = this;
        this.loading = true;
        if (this.user.accounttype === 'customer') {
            this.companyService.getAllChilds(this.user.companies_assigned).then(function (res) {
                _this.loading = false;
                var temp = [];
                var ids = _this.user.companies_assigned.concat(res);
                for (var i = 0; i < _this.companies.length; i++) {
                    for (var j = 0; j < ids.length; j++) {
                        if ((_this.companies[i]._id === ids[j]) && _this.companies[i].is_debtor === true) {
                            temp.push(_this.companies[i]);
                        }
                    }
                }
                _this.companies = temp;
                if (_this.companies.length === 1) {
                    _this.company = temp[0];
                    _this.getAssignedStores();
                }
            });
        }
        else {
            this.loading = false;
        }
    };
    CreateorderComponent.prototype.getKeyContact = function () {
        var key_contact = this.company['key_contacts'][0];
        if (key_contact.store === this.store['_id']) {
            for (var i = 0; i < this.staffs.length; i++) {
                if (this.staffs[i]._id === key_contact.key_staff) {
                    this.key_staff = this.staffs[i];
                    for (var j = 0; j < this.users.length; j++) {
                        if (this.users[j].username === this.key_staff['username']) {
                            this.staff_info = this.users[j]['user_info'];
                            this.staff_info['email'] = this.users[j]['email'];
                        }
                    }
                }
            }
        }
    };
    CreateorderComponent.prototype.selectCompany = function (event) {
        this.init();
        if (event.target.value) {
            this.assigned_stores = [];
            for (var i = 0; i < this.companies.length; i++) {
                if (this.companies[i]._id === event.target.value) {
                    this.company = this.companies[i];
                    this.company_info = this.companies[i].company_info;
                    this.getAssignedStores();
                }
            }
        }
        else {
            this.init();
        }
    };
    CreateorderComponent.prototype.selectStore = function (event) {
        this.staff_info = {};
        this.key_staff = {};
        if (event.target.value) {
            for (var i = 0; i < this.stores.length; i++) {
                if (this.stores[i]._id === event.target.value) {
                    this.store = this.stores[i];
                    this.store_address = this.stores[i]['store_info'].address;
                    this.store_info = this.stores[i]['store_info'];
                }
            }
            this.getKeyContact();
        }
        else {
            this.store = {};
            this.store_address = {};
            this.key_staff = {};
            this.staff_info = {};
        }
    };
    CreateorderComponent.prototype.sendEmail = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You will Send Email to ' + this.store['email'],
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, please!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            var content = {};
            content['key_staff'] = _this.key_staff;
            content['staff_info'] = _this.staff_info;
            content['type'] = 'order';
            content['email'] = _this.store['email'];
            _this.sendRemittance.sendRemittance(content).then(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
            swal('Sent Email Succesffully!', 'Sent Email To ' + _this.store['email'], 'success');
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    CreateorderComponent.prototype.selectArea = function (event) {
        if (event.target.checked) {
            if (event.target.value === 'carpet') {
                this.areas_required.carpet = true;
            }
            else if (event.target.value === 'kitchen') {
                this.areas_required.kitchen = true;
            }
            else if (event.target.value === 'bathroom') {
                this.areas_required.bathroom = true;
            }
            else if (event.target.value === 'laundry') {
                this.areas_required.laundry = true;
            }
            else if (event.target.value === 'entire') {
                this.areas_required = {
                    'carpet': true,
                    'kitchen': true,
                    'bathroom': true,
                    'laundry': true
                };
            }
            else if (event.target.value === 'other') {
                this.visible_special = true;
            }
        }
        else {
            if (event.target.value === 'carpet') {
                this.areas_required.carpet = false;
            }
            else if (event.target.value === 'kitchen') {
                this.areas_required.kitchen = false;
            }
            else if (event.target.value === 'bathroom') {
                this.areas_required.bathroom = false;
            }
            else if (event.target.value === 'laundry') {
                this.areas_required.laundry = false;
            }
            else if (event.target.value === 'entire') {
                this.areas_required = {
                    'carpet': false,
                    'kitchen': false,
                    'bathroom': false,
                    'laundry': false
                };
            }
            else if (event.target.value === 'other') {
                this.visible_special = false;
            }
        }
    };
    ;
    return CreateorderComponent;
}());
CreateorderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createorder',
        template: __webpack_require__(280),
        styles: [__webpack_require__(229)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_unittypes_service__["a" /* UnittypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_unittypes_service__["a" /* UnittypesService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_colschemas_service__["a" /* ColschemasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_colschemas_service__["a" /* ColschemasService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services_sendremittance_service__["a" /* SendremittanceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_sendremittance_service__["a" /* SendremittanceService */]) === "function" && _f || Object])
], CreateorderComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=createorder.component.js.map

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_sendremittance_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var OrdersComponent = (function () {
    function OrdersComponent(router, storeService, companyService, sendRemittance) {
        var _this = this;
        this.router = router;
        this.storeService = storeService;
        this.companyService = companyService;
        this.sendRemittance = sendRemittance;
        this.loading = false;
        this.rows = [];
        this.temp = [];
        this.oinvoices = [];
        this.invoices = [];
        this.selectedOrders = [];
        this.stores = [];
        this.companies = [];
        this.codes = [];
        this.fType = 'All';
        this.fStore = 'All';
        this.fVillage = 'All';
        this.sVillage = 'All';
        this.sumAmount = 0;
        this.sumBalance = 0;
        this.invoiceCount = 0;
        this.tickCount = 0;
        this.selectedItem = {};
        this.summaries = [];
        this.oSummaries = [];
        this.summariesTotal = {};
        this.email_address = ''; // to send send remitance
        this.email_data = []; // invoices to send to support office (carpet court)
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.order_permission = this.user.special_permissions['order'];
        }
        if (this.user.role) {
            this.order_permission = this.user.role['order'];
        }
        this.storeService.getSupportOffice().then(function (res) {
            _this.email_address = res['email'];
        }, function (err) {
            console.log(err);
        });
    }
    OrdersComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        return [4 /*yield*/, this.fetch(function (data) {
                                var xml = $.parseXML(data).getElementsByTagName('row');
                                // console.log(xml);
                                for (var i = 0; i < xml.length; i++) {
                                    var InvNum = $(xml[i]).find('InvNum')[0].textContent;
                                    var InvDate = $(xml[i]).find('DateInvoiced')[0].textContent;
                                    var Store = $(xml[i]).find('StoreName')[0].textContent;
                                    var Village = $(xml[i]).find('Village')[0].textContent;
                                    var Balance = $(xml[i]).find('Balance')[0].textContent;
                                    var AmountToPay = $(xml[i]).find('Balance')[0].textContent;
                                    var Period = $(xml[i]).find('Period')[0].textContent;
                                    var MonthsOld = $(xml[i]).find('MonthsOld')[0].textContent;
                                    var Value = $(xml[i]).find('Value')[0].textContent;
                                    var GST = $(xml[i]).find('GST')[0].textContent;
                                    var InvoiceTotal = $(xml[i]).find('InvoiceTotal')[0].textContent;
                                    var PONum = $(xml[i]).find('PONum')[0].textContent;
                                    var Code = $(xml[i]).find('Code')[0].textContent;
                                    var CommonName = $(xml[i]).find('CommonName')[0].textContent;
                                    var invoice = {};
                                    invoice['invnum'] = InvNum;
                                    invoice['invdate'] = InvDate;
                                    invoice['store'] = Store;
                                    invoice['village'] = Village;
                                    invoice['balance'] = Balance;
                                    invoice['amounttopay'] = Balance;
                                    invoice['checked'] = false;
                                    invoice['period'] = Period;
                                    invoice['monthsold'] = MonthsOld;
                                    invoice['value'] = Value;
                                    invoice['gst'] = GST;
                                    invoice['invoicetotal'] = InvoiceTotal;
                                    invoice['ponum'] = PONum;
                                    invoice['code'] = Code;
                                    invoice['commonname'] = CommonName;
                                    var cExist = false;
                                    for (var j = 0; j < _this.codes.length; j++) {
                                        if (_this.codes[j] === Code) {
                                            cExist = true;
                                        }
                                    }
                                    if (!cExist) {
                                        _this.codes.push(Code);
                                    }
                                    _this.invoices.push(invoice);
                                    _this.oinvoices.push(invoice);
                                }
                                for (var i = 0; i < _this.codes.length; i++) {
                                    var summary = {};
                                    for (var j = 0; j < _this.invoices.length; j++) {
                                        if (_this.codes[i] === _this.invoices[j].code) {
                                            summary['village'] = _this.invoices[j].village;
                                            if (_this.invoices[j].period === 'Current') {
                                                summary['current'] = parseFloat(_this.invoices[j].invoicetotal);
                                            }
                                            else {
                                                if (parseFloat(_this.invoices[j].monthsold) > 3) {
                                                    summary['older'] = parseFloat(_this.invoices[j].invoicetotal);
                                                }
                                                else if (parseFloat(_this.invoices[j].monthsold) === 3) {
                                                    summary['three'] = parseFloat(_this.invoices[j].invoicetotal);
                                                }
                                                else if (parseFloat(_this.invoices[j].monthsold) === 2) {
                                                    summary['two'] = parseFloat(_this.invoices[j].invoicetotal);
                                                }
                                                else {
                                                    summary['one'] = parseFloat(_this.invoices[j].invoicetotal);
                                                }
                                            }
                                        }
                                    }
                                    summary['code'] = _this.codes[i];
                                    _this.summaries.push(summary);
                                    _this.oSummaries.push(summary);
                                }
                                _this.getAllCompanies();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrdersComponent.prototype.getAllStores = function () {
        var _this = this;
        this.storeService.getAllStores().then(function (res) {
            _this.loading = false;
            var ids = [];
            for (var i = 0; i < _this.companies.length; i++) {
                for (var j = 0; j < _this.companies[i]['assigned_stores'].length; j++) {
                    ids.push(_this.companies[i]['assigned_stores'][j]);
                }
            }
            ids = Array.from(new Set(ids));
            for (var i = 0; i < Object.keys(res).length; i++) {
                for (var j = 0; j < ids.length; j++) {
                    if (res[i]._id === ids[j]) {
                        _this.stores.push(res[i]);
                    }
                }
            }
        }, function (err) {
            _this.loading = false;
            console.log(err);
        });
    };
    OrdersComponent.prototype.filterInvoices = function () {
        if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
            for (var i = 0; i < this.invoices.length; i++) {
                this.invoices[i]['visible'] = true;
                this.invoiceCount++;
            }
        }
        else {
            for (var i = 0; i < this.invoices.length; i++) {
                for (var j = 0; j < this.companies.length; j++) {
                    if (this.invoices[i]['village'] === this.companies[j].name) {
                        this.invoices[i]['visible'] = true;
                        this.invoiceCount++;
                    }
                }
            }
        }
    };
    OrdersComponent.prototype.filterSummary = function () {
        if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
            for (var i = 0; i < this.oSummaries.length; i++) {
                this.oSummaries[i]['visible'] = true;
            }
        }
        else {
            for (var i = 0; i < this.oSummaries.length; i++) {
                for (var j = 0; j < this.companies.length; j++) {
                    if (this.oSummaries[i]['village'] === this.companies[j].name) {
                        this.oSummaries[i]['visible'] = true;
                    }
                }
            }
        }
    };
    OrdersComponent.prototype.getTotalSummary = function () {
        var olderTotal = 0, threeTotal = 0, twoTotal = 0, oneTotal = 0, currentTotal = 0;
        for (var i = 0; i < this.summaries.length; i++) {
            if (this.summaries[i]['visible'] === true) {
                if (this.summaries[i].older) {
                    olderTotal += this.summaries[i].older;
                }
                if (this.summaries[i].three) {
                    threeTotal += this.summaries[i].three;
                }
                if (this.summaries[i].two) {
                    twoTotal += this.summaries[i].two;
                }
                if (this.summaries[i].one) {
                    oneTotal += this.summaries[i].one;
                }
                if (this.summaries[i].current) {
                    currentTotal += this.summaries[i].current;
                }
            }
        }
        this.summariesTotal['older'] = olderTotal;
        this.summariesTotal['three'] = threeTotal;
        this.summariesTotal['two'] = twoTotal;
        this.summariesTotal['one'] = oneTotal;
        this.summariesTotal['current'] = currentTotal;
        this.summariesTotal['sumtotal'] = olderTotal + threeTotal + twoTotal + oneTotal + currentTotal;
    };
    // Get All Companies
    OrdersComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.companyService.getAllCompanies().then(function (res) {
            if (_this.user.accounttype === 'super' || _this.user.accounttype === 'staff') {
                for (var i = 0; i < Object.keys(res).length; i++) {
                    _this.companies.push(res[i]);
                }
                _this.getAllStores();
                _this.filterInvoices();
                _this.filterSummary();
                _this.getTotalSummary();
            }
            if (_this.user.accounttype === 'customer') {
                _this.companyService.getAllChilds(_this.user.companies_assigned).then(function (response) {
                    var ids = _this.user.companies_assigned.concat(response);
                    for (var i = 0; i < Object.keys(res).length; i++) {
                        for (var j = 0; j < ids.length; j++) {
                            if (res[i]._id === ids[j] && res[i]['is_debtor'] === true) {
                                _this.companies.push(res[i]);
                            }
                        }
                    }
                    _this.getAllStores();
                    _this.filterInvoices();
                    _this.filterSummary();
                    _this.getTotalSummary();
                }, function (error) {
                    console.log(error);
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    OrdersComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', '/data/Summerset_Invoices.xml', true);
        req.onload = function () {
            cb(req.response);
        };
        req.send();
    };
    OrdersComponent.prototype.updateFilter = function (event) {
        var val = event.target.value;
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
    };
    OrdersComponent.prototype.filter = function () {
        this.invoices = [];
        this.invoiceCount = 0;
        for (var i = 0; i < this.oinvoices.length; i++) {
            var invoice = this.oinvoices[i];
            if (this.fVillage !== 'All' && this.fVillage !== invoice.village)
                continue;
            if (this.fStore !== 'All' && this.fStore !== invoice.store)
                continue;
            if (this.fType !== 'All' && this.fType !== 'Order')
                continue;
            this.invoices.push(invoice);
            this.invoiceCount++;
        }
        if (this.fVillage === 'All') {
            this.invoiceCount = 0;
            for (var i = 0; i < this.invoices.length; i++) {
                if (this.invoices[i]['visible'] === true) {
                    this.invoiceCount++;
                }
            }
        }
        this.calculateSum();
    };
    OrdersComponent.prototype.filterSummaries = function () {
        this.oSummaries = [];
        for (var i = 0; i < this.summaries.length; i++) {
            if (this.sVillage !== 'All' && this.summaries[i].village !== this.sVillage)
                continue;
            this.oSummaries.push(this.summaries[i]);
        }
    };
    OrdersComponent.prototype.createOrder = function () {
        this.router.navigate(['/orders/create']);
    };
    OrdersComponent.prototype.calculateSum = function () {
        this.sumAmount = 0;
        this.sumBalance = 0;
        for (var i = 0; i < this.invoices.length; i++) {
            var invoice = this.invoices[i];
            if (invoice.checked) {
                if (isNaN(parseInt(invoice.amounttopay))) {
                    this.sumAmount += 0;
                }
                else {
                    this.sumAmount += parseInt(invoice.amounttopay);
                }
                this.sumBalance += parseInt(invoice.balance);
            }
        }
    };
    OrdersComponent.prototype.selectElement = function (event, item) {
        if (event.target.checked) {
            this.tickCount++;
            this.email_data.push(item);
        }
        else {
            this.tickCount--;
            for (var i = 0; i < this.email_data.length; i++) {
                if (this.email_data[i].invnum === event.target.value) {
                    this.email_data.splice(i, 1);
                }
            }
        }
        for (var i = 0; i < this.invoices.length; i++) {
            if (this.invoices[i].invnum === event.target.value) {
                this.invoices[i].checked = event.target.checked;
            }
        }
        this.calculateSum();
    };
    OrdersComponent.prototype.showDetails = function (item) {
        this.selectedItem = {};
        this.selectedItem = item;
    };
    OrdersComponent.prototype.sendEmail = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You will Send Email to Carpet Court!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, please!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            var content = {};
            content['data'] = _this.email_data;
            content['email'] = _this.email_address;
            _this.sendRemittance.sendRemittance(content).then(function (res) {
                console.log(res);
            }, function (err) {
                console.log(err);
            });
            swal('Sent Email Succesffully!', 'Sent Email To Carpet Court.', 'success');
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    return OrdersComponent;
}());
OrdersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-orders',
        template: __webpack_require__(281),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        styles: [__webpack_require__(230)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_stores_service__["a" /* StoresService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_company_service__["a" /* CompanyService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_sendremittance_service__["a" /* SendremittanceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_sendremittance_service__["a" /* SendremittanceService */]) === "function" && _d || Object])
], OrdersComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=orders.component.js.map

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagenotfoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PagenotfoundComponent = (function () {
    function PagenotfoundComponent() {
    }
    PagenotfoundComponent.prototype.ngOnInit = function () { };
    PagenotfoundComponent.prototype.back = function () {
        window.history.back();
    };
    return PagenotfoundComponent;
}());
PagenotfoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-pagenotfound',
        template: __webpack_require__(282),
        styles: [__webpack_require__(231)],
    }),
    __metadata("design:paramtypes", [])
], PagenotfoundComponent);

//# sourceMappingURL=pagenotfound.component.js.map

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomerProfileComponent = (function () {
    function CustomerProfileComponent(http, router, userService) {
        this.http = http;
        this.router = router;
        this.userService = userService;
        this.customer = {};
        this.filesToPhoto = [];
        this.user_info = {};
        this.customer_info = {};
    }
    CustomerProfileComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.photoUrl = '/uploads/logo/' + this.user.photo;
        this.getUserDetails();
    };
    CustomerProfileComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.userService.getUserDetails(this.user.id).then(function (res) {
            console.log(res);
            _this.customer = res['user'];
            _this.user_info = _this.customer['user_info'];
            _this.customer_info = _this.customer['customer_info'];
            // Init UI elements
            toastr.options = {
                'debug': false,
                'newestOnTop': false,
                'positionClass': 'toast-bottom-right',
                'closeButton': true,
                'progressBar': true
            };
        }, function (err) {
            console.log(err);
        });
    };
    CustomerProfileComponent.prototype.onSubmit = function () {
        var _this = this;
        var customer = {};
        if (this.photo) {
            this.uploadPhoto();
        }
        customer['userid'] = this.customer['userid'];
        customer['customer_info'] = this.customer_info;
        customer['username'] = this.customer['username'];
        customer['user_info'] = this.user_info;
        customer['id'] = this.customer['id'];
        customer['accounttype'] = 'customer';
        customer['email'] = this.customer['email'];
        customer['photo'] = this.customer['photo'];
        customer['password'] = this.customer['password'];
        if (this.customer['role']) {
            customer['role'] = this.customer['role'];
        }
        if (this.customer['special_permissions']) {
            customer['special_permissions'] = this.customer['special_permissions'];
        }
        this.userService.updateUser(customer['id'], customer).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot edit this user, please try again');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/users']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    CustomerProfileComponent.prototype.uploadPhoto = function () {
        var formData = new FormData();
        var files = this.filesToPhoto;
        formData.append('uploads[]', files[0], files[0]['name']);
        this.http.post('upload', formData)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); });
        this.customer['photo'] = files[0]['name'];
    };
    CustomerProfileComponent.prototype.readPhoto = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.filesToPhoto = event.target.files;
            this.photo = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                _this.photoUrl = e.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    CustomerProfileComponent.prototype.cancel = function () {
        window.history.back();
    };
    return CustomerProfileComponent;
}());
CustomerProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'customer-profile',
        template: __webpack_require__(283),
        styles: [__webpack_require__(232)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */]) === "function" && _c || Object])
], CustomerProfileComponent);

var _a, _b, _c;
//# sourceMappingURL=customer.component.js.map

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfileComponent = (function () {
    function ProfileComponent() {
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUserProfile();
    };
    ProfileComponent.prototype.getUserProfile = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        this.account_type = this.user.accounttype;
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__(284),
        styles: [__webpack_require__(233)]
    }),
    __metadata("design:paramtypes", [])
], ProfileComponent);

//# sourceMappingURL=profile.component.js.map

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StaffProfileComponent = (function () {
    function StaffProfileComponent(userService, router, location) {
        this.userService = userService;
        this.router = router;
        this.user_info = {};
        this.user = {};
        this.users = [];
        this.location = location;
    }
    StaffProfileComponent.prototype.ngOnInit = function () {
        this.getUserDetails();
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    StaffProfileComponent.prototype.getUserDetails = function () {
        var _this = this;
        var userId = JSON.parse(localStorage.getItem('user')).id;
        this.userService.getUserDetails(userId).then(function (res) {
            _this.user = res['user'];
            _this.user_info = _this.user['user_info'];
        }, function (err) {
            console.log(err);
        });
    };
    StaffProfileComponent.prototype.onSubmit = function () {
        var _this = this;
        this.user['user_info'] = this.user_info;
        this.user['status'] = 'active';
        this.user['accounttype'] = 'staff';
        this.userService.updateUser(this.user['id'], this.user).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot edit this user, please try again');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/profile']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    StaffProfileComponent.prototype.cancel = function () {
        window.history.back();
    };
    return StaffProfileComponent;
}());
StaffProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'staff-profile',
        template: __webpack_require__(285),
        styles: [__webpack_require__(234)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* Location */]) === "function" && _c || Object])
], StaffProfileComponent);

var _a, _b, _c;
//# sourceMappingURL=staff.component.js.map

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuperComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SuperComponent = (function () {
    function SuperComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.super = {};
        this.user_info = {};
    }
    SuperComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
        this.userService.getUserDetails(this.user['id']).then(function (res) {
            console.log(res);
            _this.super = res['user'];
            _this.user_info = _this.super['user_info'];
        }, function (err) {
            console.log(err);
        });
    };
    SuperComponent.prototype.onSubmit = function () {
        this.super['user_info'] = this.user_info;
        this.super['status'] = 'active';
        this.super['accounttype'] = 'super';
        this.userService.updateUser(this.super['userid'], this.super).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot edit this user, please try again');
            }
            else {
                toastr.success('Success !!!');
                window.history.back();
            }
        }, function (err) {
            console.log(err);
        });
    };
    SuperComponent.prototype.cancel = function () {
        window.history.back();
    };
    return SuperComponent;
}());
SuperComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'super-profile',
        template: __webpack_require__(286),
        styles: [__webpack_require__(235)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], SuperComponent);

var _a, _b;
//# sourceMappingURL=super.component.js.map

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(validateService, authService, router) {
        this.validateService = validateService;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };
        // Required Fields
        if (!this.validateService.validateRegister(user)) {
            return false;
        }
        // Validate Email
        if (!this.validateService.validateEmail(user.email)) {
            return false;
        }
        // Register user
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.router.navigate(['/login']);
            }
            else {
                _this.router.navigate(['/register']);
            }
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(287),
        styles: [__webpack_require__(236)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _c || Object])
], RegisterComponent);

var _a, _b, _c;
//# sourceMappingURL=register.component.js.map

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_role_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_villages_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateroleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateroleComponent = (function () {
    function CreateroleComponent(router, roleService, villagesService) {
        this.router = router;
        this.roleService = roleService;
        this.villagesService = villagesService;
    }
    CreateroleComponent.prototype.ngOnInit = function () {
        this.villages = [];
        this.villages_assigned = [];
        this.getAllVillages();
        this.getAllRoles();
        this.error = '';
        this.newRole = {
            role_name: '',
            staff: '',
            customer: '',
            store: '',
            order: '',
            role: '',
            company: '',
            home_url: '',
            status: '',
        };
        this.staff = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false,
        };
        this.customer = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false,
        };
        this.store = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false,
        };
        this.order = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false,
        };
        this.role = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false,
        };
        this.company = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false,
        };
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
        this.display_dashboard = true;
        this.home_url = '';
    };
    CreateroleComponent.prototype.getAllVillages = function () {
        var _this = this;
        this.villagesService.getAllVils().then(function (res) {
            _this.villages = res;
        }, function (err) {
            console.log(err);
        });
    };
    CreateroleComponent.prototype.getAllRoles = function () {
        var _this = this;
        this.roleService.getAllRoles().then(function (res) {
            _this.currentRoles = res;
        }, function (err) {
            console.log(err);
        });
    };
    CreateroleComponent.prototype.checkAllVillages = function (event) {
        console.log('check function');
    };
    CreateroleComponent.prototype.selectVillage = function (event) {
        if (event.target.checked) {
            this.villages_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.villages_assigned.length; i++) {
                if (this.villages_assigned[i] === event.target.value) {
                    this.villages_assigned.splice(i, 1);
                }
            }
        }
    };
    // select All permission, deselect all
    CreateroleComponent.prototype.selectAll = function (event) {
        if (event.target.value === 'create') {
            if (event.target.checked) {
                this.staff['create'] = true;
                this.customer['create'] = true;
                this.company['create'] = true;
                this.role['create'] = true;
                this.store['create'] = true;
                this.order['create'] = true;
            }
            else {
                this.staff['create'] = false;
                this.customer['create'] = false;
                this.company['create'] = false;
                this.role['create'] = false;
                this.store['create'] = false;
                this.order['create'] = false;
            }
        }
        else if (event.target.value === 'edit') {
            if (event.target.checked) {
                this.staff['edit'] = true;
                this.customer['edit'] = true;
                this.company['edit'] = true;
                this.role['edit'] = true;
                this.store['edit'] = true;
                this.order['edit'] = true;
            }
            else {
                this.staff['edit'] = false;
                this.customer['edit'] = false;
                this.company['edit'] = false;
                this.role['edit'] = false;
                this.store['edit'] = false;
                this.order['edit'] = false;
            }
        }
        else if (event.target.value === 'delete') {
            if (event.target.checked) {
                this.staff['delete'] = true;
                this.customer['delete'] = true;
                this.company['delete'] = true;
                this.role['delete'] = true;
                this.store['delete'] = true;
                this.order['delete'] = true;
            }
            else {
                this.staff['delete'] = false;
                this.customer['delete'] = false;
                this.company['delete'] = false;
                this.role['delete'] = false;
                this.store['delete'] = false;
                this.order['delete'] = false;
            }
        }
        else if (event.target.value === 'view') {
            if (event.target.checked) {
                this.staff['view'] = true;
                this.customer['view'] = true;
                this.company['view'] = true;
                this.role['view'] = true;
                this.store['view'] = true;
                this.order['view'] = true;
            }
            else {
                this.staff['view'] = false;
                this.customer['view'] = false;
                this.company['view'] = false;
                this.role['view'] = false;
                this.store['view'] = false;
                this.order['view'] = false;
            }
        }
    };
    CreateroleComponent.prototype.save = function () {
        var _this = this;
        this.newRole.staff = this.staff;
        this.newRole.customer = this.customer;
        this.newRole.store = this.store;
        this.newRole.order = this.order;
        this.newRole.role = this.role;
        this.newRole.company = this.company;
        this.newRole.home_url = this.home_url;
        this.newRole.status = true;
        this.newRole.villages_assigned = this.villages_assigned;
        this.newRole.display_dashboard = this.display_dashboard;
        this.roleService.saveRole(this.newRole).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to create a user role right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/roles']);
            }
        }, function (err) {
            console.log(err);
            alert('Something went wrong!!!');
        });
    };
    CreateroleComponent.prototype.cancel = function () {
        this.router.navigate(['/roles']);
    };
    return CreateroleComponent;
}());
CreateroleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createrole',
        template: __webpack_require__(288),
        styles: [__webpack_require__(237)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_villages_service__["a" /* VillagesService */]) === "function" && _c || Object])
], CreateroleComponent);

var _a, _b, _c;
//# sourceMappingURL=createrole.component.js.map

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_role_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_villages_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditroleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditroleComponent = (function () {
    function EditroleComponent(route, router, roleService, villagesService) {
        this.route = route;
        this.router = router;
        this.roleService = roleService;
        this.villagesService = villagesService;
        this.currentRole = {};
        this.staff = {};
        this.customer = {};
        this.store = {};
        this.order = {};
        this.role = {};
        this.company = {};
    }
    EditroleComponent.prototype.ngOnInit = function () {
        this.villages = [];
        this.villages_assigned = [];
        this.getRoleDetails(this.route.snapshot.params['id']);
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    EditroleComponent.prototype.getRoleDetails = function (id) {
        var _this = this;
        this.roleService.getRoleDetails(id).then(function (res) {
            _this.currentRole = res;
            _this.staff = res['staff'];
            _this.customer = res['customer'];
            _this.store = res['store'];
            _this.order = res['order'];
            _this.role = res['role'];
            _this.company = res['company'];
            _this.status = res['status'];
            _this.display_dashboard = res['display_dashboard'];
            _this.villages_assigned = res['villages_assigned'];
            _this.villagesService.getAllVils().then(function (respond) {
                _this.villages = respond;
                for (var i = 0; i < _this.villages.length; i++) {
                    for (var j = 0; j < _this.villages_assigned.length; j++) {
                        if (_this.villages[i]._id === _this.villages_assigned[j]) {
                            _this.villages[i]['checked'] = true;
                        }
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log(err);
        });
    };
    EditroleComponent.prototype.selectVillage = function (event) {
        if (event.target.checked) {
            this.villages_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.villages_assigned.length; i++) {
                if (this.villages_assigned[i] === event.target.value) {
                    this.villages_assigned.splice(i, 1);
                }
            }
        }
    };
    EditroleComponent.prototype.checkAllVillages = function (event) {
        if (event.target.checked) {
            for (var i = 0; i < this.villages.length; i++) {
                this.villages[i]['checked'] = true;
            }
        }
        else {
            for (var i = 0; i < this.villages.length; i++) {
                this.villages[i]['checked'] = false;
            }
        }
    };
    // select All permission, deselect all
    EditroleComponent.prototype.selectAll = function (event) {
        if (event.target.value === 'create') {
            if (event.target.checked) {
                this.staff['create'] = true;
                this.customer['create'] = true;
                this.company['create'] = true;
                this.role['create'] = true;
                this.store['create'] = true;
                this.order['create'] = true;
            }
            else {
                this.staff['create'] = false;
                this.customer['create'] = false;
                this.company['create'] = false;
                this.role['create'] = false;
                this.store['create'] = false;
                this.order['create'] = false;
            }
        }
        else if (event.target.value === 'edit') {
            if (event.target.checked) {
                this.staff['edit'] = true;
                this.customer['edit'] = true;
                this.company['edit'] = true;
                this.role['edit'] = true;
                this.store['edit'] = true;
                this.order['edit'] = true;
            }
            else {
                this.staff['edit'] = false;
                this.customer['edit'] = false;
                this.company['edit'] = false;
                this.role['edit'] = false;
                this.store['edit'] = false;
                this.order['edit'] = false;
            }
        }
        else if (event.target.value === 'delete') {
            if (event.target.checked) {
                this.staff['delete'] = true;
                this.customer['delete'] = true;
                this.company['delete'] = true;
                this.role['delete'] = true;
                this.store['delete'] = true;
                this.order['delete'] = true;
            }
            else {
                this.staff['delete'] = false;
                this.customer['delete'] = false;
                this.company['delete'] = false;
                this.role['delete'] = false;
                this.store['delete'] = false;
                this.order['delete'] = false;
            }
        }
        else if (event.target.value === 'view') {
            if (event.target.checked) {
                this.staff['view'] = true;
                this.customer['view'] = true;
                this.company['view'] = true;
                this.role['view'] = true;
                this.store['view'] = true;
                this.order['view'] = true;
            }
            else {
                this.staff['view'] = false;
                this.customer['view'] = false;
                this.company['view'] = false;
                this.role['view'] = false;
                this.store['view'] = false;
                this.order['view'] = false;
            }
        }
    };
    EditroleComponent.prototype.save = function () {
        var _this = this;
        this.currentRole.staff = this.staff;
        this.currentRole.customer = this.customer;
        this.currentRole.order = this.order;
        this.currentRole.store = this.store;
        this.currentRole.role = this.role;
        this.currentRole.status = this.status;
        this.currentRole.display_dashboard = this.display_dashboard;
        this.roleService.updateRole(this.currentRole._id, this.currentRole).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to edit a user role right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/roles']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    EditroleComponent.prototype.cancel = function () {
        this.router.navigate(['/roles']);
    };
    return EditroleComponent;
}());
EditroleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-editrole',
        template: __webpack_require__(289),
        styles: [__webpack_require__(238)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_villages_service__["a" /* VillagesService */]) === "function" && _d || Object])
], EditroleComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=editrole.component.js.map

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_role_service__ = __webpack_require__(20);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RoleComponent = (function () {
    function RoleComponent(router, roleService) {
        this.router = router;
        this.roleService = roleService;
        this.loading = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.role_permission = this.user.special_permissions['role'];
        }
        if (this.user.role) {
            this.role_permission = this.user.role['role'];
        }
    }
    RoleComponent.prototype.ngOnInit = function () {
        this.roles = [];
        this.selectedRoles = [];
        this.getAllRoles();
    };
    RoleComponent.prototype.getAllRoles = function () {
        var _this = this;
        this.loading = true;
        this.roles = [];
        this.roleService.getAllRoles().then(function (res) {
            _this.loading = false;
            _this.roles = res;
        }, function (err) {
            console.log(err);
        });
    };
    RoleComponent.prototype.selectElement = function (event) {
        if (event.target.checked) {
            this.selectedRoles.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedRoles.length; i++) {
                if (this.selectedRoles[i] === event.target.value) {
                    this.selectedRoles.splice(i, 1);
                }
            }
        }
    };
    RoleComponent.prototype.deleteRoles = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover selected roles!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            _this.roleService.deleteRoles(_this.selectedRoles).then(function (res) {
                if (res['success']) {
                    _this.selectedRoles = [];
                    _this.getAllRoles();
                }
            }, function (err) {
                console.error(err);
            });
            swal('Deleted!', 'Selected roles has been deleted.', 'success');
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    RoleComponent.prototype.reactivateRoles = function () {
        var _this = this;
        this.roleService.reactivateRoles(this.selectedRoles).then(function (res) {
            _this.getAllRoles();
        }, function (err) {
            console.error(err);
        });
    };
    RoleComponent.prototype.deactivateRoles = function () {
        var _this = this;
        this.roleService.deactivateRoles(this.selectedRoles).then(function (res) {
            _this.getAllRoles();
        }, function (err) {
            console.error(err);
        });
    };
    return RoleComponent;
}());
RoleComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-role',
        template: __webpack_require__(290),
        styles: [__webpack_require__(239)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */]) === "function" && _b || Object])
], RoleComponent);

var _a, _b;
//# sourceMappingURL=role.component.js.map

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColschemaComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ColschemaComponent = (function () {
    function ColschemaComponent(unitTypesService, colSchemaService) {
        this.unitTypesService = unitTypesService;
        this.colSchemaService = colSchemaService;
        this.selectedColSchemas = [];
    }
    ColschemaComponent.prototype.ngOnInit = function () {
        this.unitTypes = [];
        this.colSchemas = [];
        this.unitTypesAssigned = [];
        this.getAllColSchemas();
    };
    ColschemaComponent.prototype.getAllColSchemas = function () {
        var _this = this;
        this.colSchemas = [];
        this.colSchemaService.getAllCols().then(function (res) {
            var temp = [];
            _this.unitTypesService.getAllUnitTypes().then(function (respond) {
                for (var i = 0; i < Object.keys(res).length; i++) {
                    var colSchema = {};
                    colSchema['_id'] = res[i]._id;
                    colSchema['name'] = res[i].name;
                    colSchema['status'] = res[i].status;
                    temp = [];
                    for (var j = 0; j < Object.keys(respond).length; j++) {
                        for (var k = 0; k < res[i]['unittypes_assigned'].length; k++) {
                            if (respond[j]._id === res[i]['unittypes_assigned'][k]) {
                                temp.push(respond[j].name);
                            }
                        }
                    }
                    colSchema['unittypes_assigned'] = temp;
                    _this.colSchemas.push(colSchema);
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log(err);
        });
    };
    ColschemaComponent.prototype.deleteColSchemas = function () {
        var _this = this;
        if (this.selectedColSchemas.length !== 0) {
            swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover selected colour schemas!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            }).then(function () {
                _this.colSchemaService.deleteCols(_this.selectedColSchemas).then(function (res) {
                    if (res['success']) {
                        _this.selectedColSchemas = [];
                        _this.getAllColSchemas();
                    }
                }, function (err) {
                    console.error(err);
                });
                swal('Deleted!', 'Selected UnitTypes has been deleted.', 'success');
            }, function (dismiss) {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    swal('Cancelled', 'Your imaginary file is safe :)', 'error');
                }
            });
        }
        else {
            toastr.error(' Sorry, you did not selected any unit types');
        }
    };
    ColschemaComponent.prototype.deactivateColSchemas = function () {
        var _this = this;
        this.colSchemaService.deactivateColSchemas(this.selectedColSchemas).then(function (res) {
            _this.getAllColSchemas();
            _this.selectedColSchemas = [];
        }, function (err) {
            console.log(err);
        });
    };
    ColschemaComponent.prototype.reactivateColSchemas = function () {
        var _this = this;
        this.colSchemaService.reactivateColSchemas(this.selectedColSchemas).then(function (res) {
            _this.getAllColSchemas();
            _this.selectedColSchemas = [];
        }, function (err) {
            console.log(err);
        });
    };
    ColschemaComponent.prototype.selectElement = function (event) {
        if (event.target.checked) {
            this.selectedColSchemas.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedColSchemas.length; i++) {
                if (this.selectedColSchemas[i] === event.target.value) {
                    this.selectedColSchemas.splice(i, 1);
                }
            }
        }
    };
    return ColschemaComponent;
}());
ColschemaComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-colschema',
        template: __webpack_require__(291),
        styles: [__webpack_require__(240)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__["a" /* ColschemasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__["a" /* ColschemasService */]) === "function" && _b || Object])
], ColschemaComponent);

var _a, _b;
//# sourceMappingURL=colschema.component.js.map

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatecolComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreatecolComponent = (function () {
    function CreatecolComponent(router, unitTypesService, colSchemaService) {
        this.router = router;
        this.unitTypesService = unitTypesService;
        this.colSchemaService = colSchemaService;
    }
    CreatecolComponent.prototype.ngOnInit = function () {
        this.areas = [];
        this.selectedArea = {};
        this.selectedAreas = [];
        this.newArea = {};
        this.unitTypes = [];
        this.unittypes_assigned = [];
        this.colSchema = {
            name: '',
            status: ''
        };
        this.getAllUnitTypes();
    };
    CreatecolComponent.prototype.createArea = function () {
        this.areas.push(this.newArea);
        this.newArea = {};
    };
    CreatecolComponent.prototype.selectArea = function (event) {
        if (event.target.checked) {
            this.selectedAreas.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedAreas.length; i++) {
                if (this.selectedAreas[i] === event.target.value) {
                    this.selectedAreas.splice(i, 1);
                }
            }
        }
    };
    CreatecolComponent.prototype.editArea = function (item) {
        this.selectedArea = {};
        this.selectedArea = item;
    };
    CreatecolComponent.prototype.saveArea = function () {
        var index = this.areas.indexOf(this.selectedArea.name);
        this.areas[index] = this.selectedArea;
    };
    CreatecolComponent.prototype.deleteAreas = function () {
        for (var i = 0; i < this.selectedAreas.length; i++) {
            for (var j = 0; j < this.areas.length; j++) {
                if (this.areas[j]['supplier'] === this.selectedAreas[i]) {
                    var index = this.areas.indexOf(this.selectedAreas[i]);
                    this.areas.splice(index, 1);
                }
            }
        }
        this.selectedAreas = [];
    };
    CreatecolComponent.prototype.getAllUnitTypes = function () {
        var _this = this;
        this.unitTypesService.getAllUnitTypes().then(function (res) {
            _this.unitTypes = res;
        }, function (err) {
            console.log(err);
        });
    };
    CreatecolComponent.prototype.selectUnitType = function (event) {
        if (event.target.checked) {
            this.unittypes_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.unittypes_assigned.length; i++) {
                if (this.unittypes_assigned[i] === event.target.value) {
                    this.unittypes_assigned.splice(i, 1);
                }
            }
        }
    };
    CreatecolComponent.prototype.save = function () {
        var _this = this;
        this.colSchema.status = true;
        this.colSchema['area'] = this.areas;
        this.colSchema.unittypes_assigned = this.unittypes_assigned;
        this.colSchemaService.saveCol(this.colSchema).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to create a colour schema right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/col-schema']);
            }
        }, function (err) {
            console.log(err);
            alert('Something went wrong!!!');
        });
    };
    CreatecolComponent.prototype.cancel = function () {
        this.router.navigate(['/col-schema']);
    };
    return CreatecolComponent;
}());
CreatecolComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createcol',
        template: __webpack_require__(292),
        styles: [__webpack_require__(241)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__["a" /* ColschemasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__["a" /* ColschemasService */]) === "function" && _c || Object])
], CreatecolComponent);

var _a, _b, _c;
//# sourceMappingURL=createcol.component.js.map

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditcolComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditcolComponent = (function () {
    function EditcolComponent(router, route, unitTypesService, colSchemaService) {
        this.router = router;
        this.route = route;
        this.unitTypesService = unitTypesService;
        this.colSchemaService = colSchemaService;
        this.colSchema = {};
        this.unitTypes = [];
        this.unittypes_assigned = [];
        this.newArea = {};
        this.selectedAreas = [];
    }
    EditcolComponent.prototype.ngOnInit = function () {
        this.selectedArea = {};
        this.areas = [];
        this.getColSchemaDetails(this.route.snapshot.params['id']);
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    EditcolComponent.prototype.getColSchemaDetails = function (id) {
        var _this = this;
        this.colSchemaService.getColDetails(id).then(function (res) {
            _this.colSchema = res;
            _this.areas = _this.colSchema['area'];
            _this.unittypes_assigned = res['unittypes_assigned'];
            _this.unitTypesService.getAllUnitTypes().then(function (respond) {
                _this.unitTypes = respond;
                for (var i = 0; i < _this.unitTypes.length; i++) {
                    for (var j = 0; j < _this.unittypes_assigned.length; j++) {
                        if (_this.unitTypes[i]._id === _this.unittypes_assigned[j]) {
                            _this.unitTypes[i]['checked'] = true;
                        }
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log(err);
        });
    };
    EditcolComponent.prototype.createArea = function () {
        this.areas.push(this.newArea);
        this.newArea = {};
    };
    EditcolComponent.prototype.selectArea = function (event) {
        console.log(event.target.value);
        if (event.target.checked) {
            this.selectedAreas.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedAreas.length; i++) {
                if (this.selectedAreas[i] === event.target.value) {
                    this.selectedAreas.splice(i, 1);
                }
            }
        }
    };
    EditcolComponent.prototype.editArea = function (item) {
        this.selectedArea = {};
        this.selectedArea = item;
    };
    EditcolComponent.prototype.saveArea = function () {
        var index = this.areas.indexOf(this.selectedArea.name);
        this.areas[index] = this.selectedArea;
    };
    EditcolComponent.prototype.deleteAreas = function () {
        for (var i = 0; i < this.selectedAreas.length; i++) {
            for (var j = 0; j < this.areas.length; j++) {
                if (this.areas[j]['supplier'] === this.selectedAreas[i]) {
                    var index = this.areas.indexOf(this.selectedAreas[i]);
                    this.areas.splice(index, 1);
                }
            }
        }
        this.selectedAreas = [];
    };
    EditcolComponent.prototype.selectUnitType = function (event) {
        if (event.target.checked) {
            this.unittypes_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.unittypes_assigned.length; i++) {
                if (this.unittypes_assigned[i] === event.target.value) {
                    this.unittypes_assigned.splice(i, 1);
                }
            }
        }
    };
    EditcolComponent.prototype.save = function () {
        var _this = this;
        this.colSchema['unittypes_assigned'] = this.unittypes_assigned;
        this.colSchema['area'] = this.areas;
        this.colSchemaService.updateCol(this.colSchema['_id'], this.colSchema).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to edit a colourschema right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/col-schema']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    EditcolComponent.prototype.cancel = function () {
        this.router.navigate(['/col-schema']);
    };
    return EditcolComponent;
}());
EditcolComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-editcol',
        template: __webpack_require__(293),
        styles: [__webpack_require__(242)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__["a" /* ColschemasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_colschemas_service__["a" /* ColschemasService */]) === "function" && _d || Object])
], EditcolComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=editcol.component.js.map

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_villages_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_unittypes_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateunitComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateunitComponent = (function () {
    function CreateunitComponent(router, villagesService, unittypesService) {
        this.router = router;
        this.villagesService = villagesService;
        this.unittypesService = unittypesService;
    }
    CreateunitComponent.prototype.ngOnInit = function () {
        this.newUnitType = {
            name: '',
            status: ''
        };
        this.villages = [];
        this.villages_assigned = [];
        this.getAllVillages();
        // Init UI elements
        toastr.options = {
            "debug": false,
            "newestOnTop": false,
            "positionClass": "toast-bottom-right",
            "closeButton": true,
            "progressBar": true
        };
    };
    CreateunitComponent.prototype.getAllVillages = function () {
        var _this = this;
        this.villagesService.getAllVils().then(function (res) {
            _this.villages = res;
        }, function (err) {
            console.log(err);
        });
    };
    CreateunitComponent.prototype.selectVillage = function (event) {
        if (event.target.checked) {
            this.villages_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.villages_assigned.length; i++) {
                if (this.villages_assigned[i] === event.target.value) {
                    this.villages_assigned.splice(i, 1);
                }
            }
        }
    };
    CreateunitComponent.prototype.save = function () {
        var _this = this;
        this.newUnitType.status = true;
        this.newUnitType.villages_assigned = this.villages_assigned;
        this.unittypesService.saveUnitType(this.newUnitType).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to create a unittype right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/uni-types']);
            }
        }, function (err) {
            alert('Something went wrong!!!');
        });
    };
    CreateunitComponent.prototype.cancel = function () {
        this.router.navigate(['/uni-types']);
    };
    return CreateunitComponent;
}());
CreateunitComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createunit',
        template: __webpack_require__(294),
        styles: [__webpack_require__(243)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_unittypes_service__["a" /* UnittypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_unittypes_service__["a" /* UnittypesService */]) === "function" && _c || Object])
], CreateunitComponent);

var _a, _b, _c;
//# sourceMappingURL=createunit.component.js.map

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_villages_service__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_unittypes_service__ = __webpack_require__(21);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditunitComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditunitComponent = (function () {
    function EditunitComponent(router, route, villagesService, unittypesService) {
        this.router = router;
        this.route = route;
        this.villagesService = villagesService;
        this.unittypesService = unittypesService;
        this.unitType = {};
        this.villages = [];
        this.villages_assigned = [];
    }
    EditunitComponent.prototype.ngOnInit = function () {
        this.getUnitTypeDetails(this.route.snapshot.params['id']);
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    EditunitComponent.prototype.getUnitTypeDetails = function (id) {
        var _this = this;
        this.unittypesService.getUnitTypeDetails(this.route.snapshot.params['id']).then(function (res) {
            _this.unitType = res;
            _this.villages_assigned = res['villages_assigned'];
            _this.villagesService.getAllVils().then(function (respond) {
                _this.villages = respond;
                for (var i = 0; i < _this.villages.length; i++) {
                    for (var j = 0; j < _this.villages_assigned.length; j++) {
                        if (_this.villages[i]._id === _this.villages_assigned[j]) {
                            _this.villages[i].checked = true;
                        }
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log(err);
        });
    };
    EditunitComponent.prototype.selectVillage = function (event) {
        if (event.target.checked) {
            this.villages_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.villages_assigned.length; i++) {
                if (this.villages_assigned[i] === event.target.value) {
                    this.villages_assigned.splice(i, 1);
                }
            }
        }
    };
    EditunitComponent.prototype.save = function () {
        var _this = this;
        this.unitType['villages_assigned'] = this.villages_assigned;
        this.unittypesService.updateUnitType(this.unitType['_id'], this.unitType).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to edit a unit type right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/uni-types']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    EditunitComponent.prototype.cancel = function () {
        this.router.navigate(['/uni-types']);
    };
    return EditunitComponent;
}());
EditunitComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-editunit',
        template: __webpack_require__(295),
        styles: [__webpack_require__(244)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_unittypes_service__["a" /* UnittypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_unittypes_service__["a" /* UnittypesService */]) === "function" && _d || Object])
], EditunitComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=editunit.component.js.map

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_villages_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UnittypeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UnittypeComponent = (function () {
    function UnittypeComponent(unitTypesService, villagesService) {
        this.unitTypesService = unitTypesService;
        this.villagesService = villagesService;
    }
    UnittypeComponent.prototype.ngOnInit = function () {
        this.unitTypes = [];
        this.selectedUnitTypes = [];
        this.villages = [];
        this.getAllUnitTypes();
    };
    UnittypeComponent.prototype.getAllUnitTypes = function () {
        var _this = this;
        this.unitTypes = [];
        this.unitTypesService.getAllUnitTypes().then(function (res) {
            var temp = [];
            _this.villagesService.getAllVils().then(function (respond) {
                for (var i = 0; i < Object.keys(res).length; i++) {
                    var unitType = {};
                    unitType['_id'] = res[i]._id;
                    unitType['name'] = res[i].name;
                    unitType['status'] = res[i].status;
                    temp = [];
                    for (var j = 0; j < Object.keys(respond).length; j++) {
                        for (var k = 0; k < res[i]['villages_assigned'].length; k++) {
                            if (respond[j]._id === res[i]['villages_assigned'][k]) {
                                temp.push(respond[j].name);
                            }
                        }
                    }
                    unitType['villages_assigned'] = temp;
                    _this.unitTypes.push(unitType);
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) { console.log(err); });
    };
    UnittypeComponent.prototype.deleteUnitTypes = function () {
        var _this = this;
        if (this.selectedUnitTypes.length !== 0) {
            swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover selected unittypes!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it'
            }).then(function () {
                _this.unitTypesService.deleteUnitTypes(_this.selectedUnitTypes).then(function (res) {
                    if (res['success']) {
                        _this.selectedUnitTypes = [];
                        _this.getAllUnitTypes();
                    }
                }, function (err) {
                    console.error(err);
                });
                swal('Deleted!', 'Selected UnitTypes has been deleted.', 'success');
            }, function (dismiss) {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    swal('Cancelled', 'Your imaginary file is safe :)', 'error');
                }
            });
        }
        else {
            toastr.error(' Sorry, you did not selected any unit types');
        }
    };
    UnittypeComponent.prototype.deactivateUnitTypes = function () {
        var _this = this;
        this.unitTypesService.deactivateUnitTypes(this.selectedUnitTypes).then(function (res) {
            _this.getAllUnitTypes();
            _this.selectedUnitTypes = [];
        }, function (err) {
            console.log(err);
        });
    };
    UnittypeComponent.prototype.reactivateUnitTypes = function () {
        var _this = this;
        this.unitTypesService.reactivateUnitTypes(this.selectedUnitTypes).then(function (res) {
            _this.getAllUnitTypes();
            _this.selectedUnitTypes = [];
        }, function (err) {
            console.log(err);
        });
    };
    UnittypeComponent.prototype.selectElement = function (event) {
        if (event.target.checked) {
            this.selectedUnitTypes.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedUnitTypes.length; i++) {
                if (this.selectedUnitTypes[i] === event.target.value) {
                    this.selectedUnitTypes.splice(i, 1);
                }
            }
        }
    };
    return UnittypeComponent;
}());
UnittypeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-unittype',
        template: __webpack_require__(296),
        styles: [__webpack_require__(245)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_unittypes_service__["a" /* UnittypesService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */]) === "function" && _b || Object])
], UnittypeComponent);

var _a, _b;
//# sourceMappingURL=unittype.component.js.map

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_villages_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatevilComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreatevilComponent = (function () {
    function CreatevilComponent(router, villagesServices) {
        this.router = router;
        this.villagesServices = villagesServices;
    }
    CreatevilComponent.prototype.ngOnInit = function () {
        // Init UI elements
        toastr.options = {
            "debug": false,
            "newestOnTop": false,
            "positionClass": "toast-bottom-right",
            "closeButton": true,
            "progressBar": true
        };
        this.village = {
            name: '',
            status: ''
        };
    };
    CreatevilComponent.prototype.save = function () {
        var _this = this;
        this.village.status = true;
        this.villagesServices.saveVil(this.village).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to create a village right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/vils']);
            }
        }, function (err) {
            alert('Something went wrong!!!');
        });
    };
    CreatevilComponent.prototype.cancel = function () {
        this.router.navigate(['/vils']);
    };
    return CreatevilComponent;
}());
CreatevilComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createvil',
        template: __webpack_require__(297),
        styles: [__webpack_require__(246)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */]) === "function" && _b || Object])
], CreatevilComponent);

var _a, _b;
//# sourceMappingURL=createvil.component.js.map

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_villages_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditvilComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EditvilComponent = (function () {
    function EditvilComponent(route, router, villageService) {
        this.route = route;
        this.router = router;
        this.villageService = villageService;
        this.village = {};
    }
    EditvilComponent.prototype.ngOnInit = function () {
        this.getVillageDetails(this.route.snapshot.params['id']);
        //Init UI elements 
        toastr.options = {
            "debug": false,
            "newestOnTop": false,
            "positionClass": "toast-bottom-right",
            "closeButton": true,
            "progressBar": true
        };
    };
    //Get Village Details
    EditvilComponent.prototype.getVillageDetails = function (id) {
        var _this = this;
        this.villageService.getVilDetails(id).then(function (res) {
            _this.village = res;
        }, function (err) {
            console.log(err);
        });
    };
    EditvilComponent.prototype.save = function () {
        var _this = this;
        console.log(this.village);
        this.villageService.updateVil(this.village["_id"], this.village).then(function (res) {
            if (!res['success']) {
                toastr.error(' Sorry, unable to edit a village right now, please try again soon');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/vils']);
            }
        }, function (err) {
            alert('Something went wrong!!!');
        });
    };
    EditvilComponent.prototype.cancel = function () {
        this.router.navigate(['/vils']);
    };
    return EditvilComponent;
}());
EditvilComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-editvil',
        template: __webpack_require__(298),
        styles: [__webpack_require__(247)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_villages_service__["a" /* VillagesService */]) === "function" && _c || Object])
], EditvilComponent);

var _a, _b, _c;
//# sourceMappingURL=editvil.component.js.map

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_villages_service__ = __webpack_require__(14);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VillagesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VillagesComponent = (function () {
    function VillagesComponent(villlageService) {
        this.villlageService = villlageService;
    }
    VillagesComponent.prototype.ngOnInit = function () {
        this.villages = [];
        this.selectedVillages = [];
        this.getAllVillages();
    };
    VillagesComponent.prototype.getAllVillages = function () {
        var _this = this;
        this.villlageService.getAllVils().then(function (res) {
            _this.villages = res;
        }, function (err) {
            console.log(err);
        });
    };
    VillagesComponent.prototype.deleteVils = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover selected villages!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            _this.villlageService.deleteVils(_this.selectedVillages).then(function (res) {
                if (res['success']) {
                    _this.selectedVillages = [];
                    _this.getAllVillages();
                }
            }, function (err) {
                console.error(err);
            });
            swal('Deleted!', 'Selected Villages has been deleted.', 'success');
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    VillagesComponent.prototype.deactivateVils = function () {
        var _this = this;
        this.villlageService.deactivateVillages(this.selectedVillages).then(function (res) {
            _this.getAllVillages();
            _this.selectedVillages = [];
        }, function (err) {
            console.error(err);
        });
    };
    VillagesComponent.prototype.reactivateVils = function () {
        var _this = this;
        this.villlageService.reactivateVillages(this.selectedVillages).then(function (res) {
            _this.getAllVillages();
            _this.selectedVillages = [];
        }, function (err) {
            console.error(err);
        });
    };
    VillagesComponent.prototype.selectElement = function (event) {
        if (event.target.checked) {
            this.selectedVillages.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedVillages.length; i++) {
                if (this.selectedVillages[i] === event.target.value) {
                    this.selectedVillages.splice(i, 1);
                }
            }
        }
    };
    return VillagesComponent;
}());
VillagesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-villages',
        template: __webpack_require__(299),
        styles: [__webpack_require__(248)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_villages_service__["a" /* VillagesService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_villages_service__["a" /* VillagesService */]) === "function" && _a || Object])
], VillagesComponent);

var _a;
//# sourceMappingURL=villages.component.js.map

/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreatestoreComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreatestoreComponent = (function () {
    function CreatestoreComponent(route, router, storeService) {
        this.route = route;
        this.router = router;
        this.storeService = storeService;
        this.regionData = { 'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands', 'Manukau City',
                'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City', 'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
        this.stores = [];
    }
    CreatestoreComponent.prototype.ngOnInit = function () {
        this.store = {
            store_title: '',
            store_type: '',
            email: '',
            parent: '',
            child: [],
            status: Boolean
        };
        this.store_info = {
            phone: '',
            email: '',
            fax: '',
            address: {
                address1: '',
                address2: ''
            },
            city: '',
            region: '',
            postcode: '',
            country: ''
        };
        this.account_info = {
            bank_account: '',
            gst_number: '',
            payable_email: ''
        };
        /*Init UI elements*/
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
        this.getAllStores();
    };
    // Get All Stores
    CreatestoreComponent.prototype.getAllStores = function () {
        var _this = this;
        this.storeService.getAllStores().then(function (res) {
            // this.stores = res;
            for (var i = 0; i < Object.keys(res).length; i++) {
                _this.stores.push(res[i]);
            }
        }, function (err) {
            console.error(err);
        });
    };
    // Select Region
    CreatestoreComponent.prototype.selectRegion = function (event) {
        var region = event.target.value;
        this.cities = this.regionData[region];
    };
    // Create New Store
    CreatestoreComponent.prototype.onSubmit = function () {
        var _this = this;
        this.store['store_info'] = this.store_info;
        this.store['account_info'] = this.account_info;
        this.store.status = true;
        this.storeService.saveStore(JSON.stringify(this.store)).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot create new store, please try again');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/stores']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    // Cancel Store Create
    CreatestoreComponent.prototype.cancel = function () {
        this.router.navigate(['/stores']);
    };
    return CreatestoreComponent;
}());
CreatestoreComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createstore',
        template: __webpack_require__(300),
        styles: [__webpack_require__(249)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */]) === "function" && _c || Object])
], CreatestoreComponent);

var _a, _b, _c;
//# sourceMappingURL=createstore.component.js.map

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StoreComponent = (function () {
    function StoreComponent(route, router, storeService, usersService) {
        this.route = route;
        this.router = router;
        this.storeService = storeService;
        this.usersService = usersService;
        this.store = {};
        this.store_info = {};
        this.account_info = {};
        this.address = {};
        this.regionData = { 'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands', 'Manukau City',
                'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City', 'Hurunui',
                'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
        this.stores = [];
        this.users = [];
        this.childs = [];
    }
    StoreComponent.prototype.ngOnInit = function () {
        this.getStore(this.route.snapshot.params['id']);
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
        this.getAllStores();
    };
    // Get All Stores
    StoreComponent.prototype.getAllStores = function () {
        var _this = this;
        this.storeService.getAllStores().then(function (res) {
            // this.stores = res;
            for (var i = 0; i < Object.keys(res).length; i++) {
                if (res[i]._id !== _this.store._id) {
                    _this.stores.push(res[i]);
                }
            }
        }, function (err) {
            console.error(err);
        });
    };
    StoreComponent.prototype.selectRegion = function (event) {
        var region = event.target.value;
        this.cities = this.regionData[region];
    };
    StoreComponent.prototype.getStore = function (id) {
        var _this = this;
        this.storeService.getStore(id).then(function (res) {
            _this.store = res;
            _this.store_info = res['store_info'];
            _this.account_info = res['account_info'];
            _this.address = _this.store_info['address'];
            _this.cities = _this.regionData[_this.store_info.region];
            _this.childs = res['child'];
            _this.assigned_users = res['assigned_users'];
            _this.usersService.getAllStaffs().then(function (response) {
                for (var i = 0; i < Object.keys(response).length; i++) {
                    for (var j = 0; j < _this.assigned_users.length; j++) {
                        if (response[i]._id === _this.assigned_users[j]) {
                            _this.users.push(response[i]);
                        }
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log(err);
        });
    };
    StoreComponent.prototype.cancel = function () {
        this.router.navigate(['/stores']);
    };
    StoreComponent.prototype.onSubmit = function () {
        var _this = this;
        this.store_info['address'] = this.address;
        this.store['store_info'] = this.store_info;
        this.storeService.updateStore(this.store['_id'], JSON.stringify(this.store)).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot edit this store, please try again');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/stores']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    return StoreComponent;
}());
StoreComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-store',
        template: __webpack_require__(301),
        styles: [__webpack_require__(250)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */]) === "function" && _d || Object])
], StoreComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=store.component.js.map

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_stores_service__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_users_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoresComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StoresComponent = (function () {
    function StoresComponent(storeService, userService, companyService) {
        this.storeService = storeService;
        this.userService = userService;
        this.companyService = companyService;
        this.loading = false;
        this.regionData = { 'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands', 'Manukau City',
                'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City',
                'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.store_permission = this.user.special_permissions['store'];
        }
        if (this.user.role) {
            this.store_permission = this.user.role['store'];
        }
    }
    StoresComponent.prototype.ngOnInit = function () {
        this.stores = [];
        this.selectedStores = [];
        this.getAllStores();
    };
    StoresComponent.prototype.getAllStores = function () {
        var _this = this;
        this.loading = true;
        this.storeService.getAllStores().then(function (res) {
            _this.loading = false;
            _this.stores = res;
            _this.filteredStores = _this.stores;
            if (_this.user.accounttype === 'customer') {
                _this.loading = true;
                _this.userService.getUserDetails(_this.user.id).then(function (user) {
                    _this.companyService.getAllChilds(user['user'].companies_assigned).then(function (child_companies) {
                        var total_companies = user['user'].companies_assigned.concat(child_companies);
                        _this.companyService.getAllCompanies().then(function (all_companies) {
                            _this.loading = false;
                            var assigned_stores = [];
                            for (var i = 0; i < Object.keys(all_companies).length; i++) {
                                for (var j = 0; j < total_companies.length; j++) {
                                    if (all_companies[i]._id === total_companies[j]) {
                                        if (all_companies[i].assigned_stores.length !== 0) {
                                            for (var k = 0; k < all_companies[i].assigned_stores.length; k++) {
                                                assigned_stores.push(all_companies[i].assigned_stores[k]);
                                            }
                                        }
                                    }
                                }
                            }
                            var temp = Array.from(new Set(assigned_stores));
                            var stores = [];
                            for (var i = 0; i < Object.keys(_this.stores).length; i++) {
                                for (var j = 0; j < temp.length; j++) {
                                    if (_this.stores[i]._id.toString() === temp[j]) {
                                        stores.push(_this.stores[i]);
                                    }
                                }
                            }
                            _this.stores = [];
                            _this.stores = stores;
                            _this.filteredStores = stores;
                        }, function (err_all_companies) {
                            _this.loading = false;
                            console.log(err_all_companies);
                        });
                    }, function (error_companies) {
                        _this.loading = false;
                        console.log(error_companies);
                    });
                }, function (error) {
                    console.log(error);
                });
            }
        }, function (err) {
            _this.loading = false;
            console.log(err);
        });
    };
    StoresComponent.prototype.selectRegion = function (event) {
        var region = event.target.value;
        this.cities = this.regionData[region];
        var temp = [];
        if (region === '') {
            this.filteredStores = this.stores;
        }
        else {
            for (var i = 0; i < this.stores.length; i++) {
                if (this.stores[i].store_info.region === region) {
                    temp.push(this.stores[i]);
                }
            }
            this.filteredStores = temp;
        }
    };
    StoresComponent.prototype.selectCity = function (event) {
        var city = event.target.value;
        var temp = [];
        if (city === '') {
            if (this.filterRegion === '') {
                this.filteredStores = this.stores;
            }
            else {
                for (var i = 0; i < this.stores.length; i++) {
                    if (this.stores[i].store_info.region === this.filterRegion) {
                        temp.push(this.stores[i]);
                    }
                }
                this.filteredStores = temp;
            }
        }
        else {
            for (var i = 0; i < this.stores.length; i++) {
                if (this.stores[i].store_info.city === city) {
                    temp.push(this.stores[i]);
                }
            }
            this.filteredStores = temp;
        }
    };
    StoresComponent.prototype.selectElement = function (event) {
        if (event.target.checked) {
            this.selectedStores.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedStores.length; i++) {
                if (this.selectedStores[i] === event.target.value) {
                    this.selectedStores.splice(i, 1);
                }
            }
        }
    };
    StoresComponent.prototype.deleteStores = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover selected stores!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            _this.storeService.deleteStore(_this.selectedStores).then(function (res) {
                _this.selectedStores = [];
                _this.getAllStores();
                if (JSON.parse(res['_body']).success) {
                    swal('Deleted!', 'Selected stores has been deleted.', 'success');
                }
                else {
                    swal('Error!', 'Cannot delete selected stores!', 'error');
                }
            }, function (err) {
                console.error(err);
            });
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    StoresComponent.prototype.deactivateStores = function () {
        var _this = this;
        this.storeService.deactivateStore(this.selectedStores).then(function (res) {
            _this.getAllStores();
        }, function (err) {
            console.error(err);
        });
    };
    StoresComponent.prototype.reactivateStores = function () {
        var _this = this;
        this.storeService.reactivateStore(this.selectedStores).then(function (res) {
            _this.getAllStores();
        }, function (err) {
            console.error(err);
        });
    };
    return StoresComponent;
}());
StoresComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-stores',
        template: __webpack_require__(302),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        styles: [__webpack_require__(251)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */]) === "function" && _c || Object])
], StoresComponent);

var _a, _b, _c;
//# sourceMappingURL=stores.component.js.map

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_stores_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportofficeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SupportofficeComponent = (function () {
    function SupportofficeComponent(storeService) {
        this.storeService = storeService;
        this.office = {};
    }
    SupportofficeComponent.prototype.ngOnInit = function () {
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
        this.getSupportOffice();
    };
    SupportofficeComponent.prototype.getSupportOffice = function () {
        var _this = this;
        this.storeService.getSupportOffice().then(function (res) {
            _this.office = res;
        }, function (err) {
            console.log(err);
        });
    };
    SupportofficeComponent.prototype.cancel = function () {
        window.history.back();
    };
    SupportofficeComponent.prototype.onSubmit = function () {
        this.storeService.updateStore(this.office['_id'], JSON.stringify(this.office)).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot edit this store, please try again');
            }
            else {
                toastr.success('Success !!!');
                window.history.back();
            }
        }, function (err) {
            console.log(err);
        });
    };
    return SupportofficeComponent;
}());
SupportofficeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-supportoffice',
        template: __webpack_require__(303),
        styles: [__webpack_require__(252)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_stores_service__["a" /* StoresService */]) === "function" && _a || Object])
], SupportofficeComponent);

var _a;
//# sourceMappingURL=supportoffice.component.js.map

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateuserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CreateuserComponent = (function () {
    function CreateuserComponent() {
    }
    CreateuserComponent.prototype.ngOnInit = function () {
        this.usertype = '';
        this.user = JSON.parse(localStorage.getItem('user'));
        // this.usertype = this.user.accounttype;
    };
    return CreateuserComponent;
}());
CreateuserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-createuser',
        template: __webpack_require__(304),
        styles: [__webpack_require__(253)]
    }),
    __metadata("design:paramtypes", [])
], CreateuserComponent);

//# sourceMappingURL=createuser.component.js.map

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_role_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_users_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CustomerComponent = (function () {
    function CustomerComponent(http, router, roleService, companyService, userService) {
        this.http = http;
        this.router = router;
        this.roleService = roleService;
        this.companyService = companyService;
        this.userService = userService;
        this.filesToLogo = [];
        this.filesToPhoto = [];
        this.staffPermission = {};
        this.customerPermission = {};
        this.storePermission = {};
        this.orderPermission = {};
        this.rolePermission = {};
        this.companyPermission = {};
        this.roles = [];
        this.users = [];
        this.companies = [];
        this.modalValid = true;
        this.regionData = {
            'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands',
                'Manukau City', 'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City', 'Hurunui',
                'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
        this.companies_assigned = [];
    }
    CustomerComponent.prototype.ngOnInit = function () {
        // Get Current User
        this.user = JSON.parse(localStorage.getItem('user'));
        // Init Special Elements
        this.newCompany = {
            name: '',
            status: ''
        };
        this.staffPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.customerPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.storePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.orderPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.rolePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.companyPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.logoUrl = 'assets/images/default-logo.jpg';
        this.photoUrl = 'assets/images/photo.jpg';
        // Init New Customer User
        this.customer = {
            username: '',
            password: '',
            company: '',
            role_name: '',
            parent: '',
            account_email: '',
            special_permissions: {}
        };
        // Init New Customer User info
        this.user_info = {
            email: '',
            phone: '',
            mobile: ''
        };
        // Init New Customer Customer Info
        this.customer_info = {
            position: '',
            prefered_contact: '',
            address: {
                address1: '',
                address2: ''
            },
            city: '',
            region: '',
            postcode: '',
            key_contact: '',
            customer_type: ''
        };
        // Get Current Roles
        this.getAllRoles();
        // Get Current Users
        this.getAllUsers();
        // Get All Companies
        this.getAllCompanies();
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    // Get All Companies
    CustomerComponent.prototype.getAllCompanies = function () {
        var _this = this;
        this.companyService.getAllCompanies().then(function (res) {
            _this.companies = res;
        }, function (err) {
            console.log(err);
        });
    };
    // Get All Users
    CustomerComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.userService.getAllUsers().then(function (res) {
            _this.users = res;
        }, function (err) {
            console.log(err);
        });
    };
    // Get Current Roles
    CustomerComponent.prototype.getAllRoles = function () {
        var _this = this;
        this.roleService.getAllRoles().then(function (res) {
            _this.roles = res;
        }, function (err) {
            console.log(err);
        });
    };
    // Select Region
    CustomerComponent.prototype.selectRegion = function (event) {
        var region = event.target.value;
        this.cities = this.regionData[region];
    };
    CustomerComponent.prototype.selectCompany = function (event) {
        if (event.target.checked) {
            this.companies_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.companies_assigned.length; i++) {
                if (event.target.value === this.companies_assigned[i]) {
                    this.companies_assigned.splice(i, 1);
                }
            }
        }
    };
    // select All permission, deselect all
    CustomerComponent.prototype.selectAll = function (event) {
        if (event.target.value === 'create') {
            if (event.target.checked) {
                this.staffPermission['create'] = true;
                this.customerPermission['create'] = true;
                this.companyPermission['create'] = true;
                this.rolePermission['create'] = true;
                this.storePermission['create'] = true;
                this.orderPermission['create'] = true;
            }
            else {
                this.staffPermission['create'] = false;
                this.customerPermission['create'] = false;
                this.companyPermission['create'] = false;
                this.rolePermission['create'] = false;
                this.storePermission['create'] = false;
                this.orderPermission['create'] = false;
            }
        }
        else if (event.target.value === 'edit') {
            if (event.target.checked) {
                this.staffPermission['edit'] = true;
                this.customerPermission['edit'] = true;
                this.companyPermission['edit'] = true;
                this.rolePermission['edit'] = true;
                this.storePermission['edit'] = true;
                this.orderPermission['edit'] = true;
            }
            else {
                this.staffPermission['edit'] = false;
                this.customerPermission['edit'] = false;
                this.companyPermission['edit'] = false;
                this.rolePermission['edit'] = false;
                this.storePermission['edit'] = false;
                this.orderPermission['edit'] = false;
            }
        }
        else if (event.target.value === 'delete') {
            if (event.target.checked) {
                this.staffPermission['delete'] = true;
                this.customerPermission['delete'] = true;
                this.companyPermission['delete'] = true;
                this.rolePermission['delete'] = true;
                this.storePermission['delete'] = true;
                this.orderPermission['delete'] = true;
            }
            else {
                this.staffPermission['delete'] = false;
                this.customerPermission['delete'] = false;
                this.companyPermission['delete'] = false;
                this.rolePermission['delete'] = false;
                this.storePermission['delete'] = false;
                this.orderPermission['delete'] = false;
            }
        }
        else if (event.target.value === 'view') {
            if (event.target.checked) {
                this.staffPermission['view'] = true;
                this.customerPermission['view'] = true;
                this.companyPermission['view'] = true;
                this.rolePermission['view'] = true;
                this.storePermission['view'] = true;
                this.orderPermission['view'] = true;
            }
            else {
                this.staffPermission['view'] = false;
                this.customerPermission['view'] = false;
                this.companyPermission['view'] = false;
                this.rolePermission['view'] = false;
                this.storePermission['view'] = false;
                this.orderPermission['view'] = false;
            }
        }
    };
    CustomerComponent.prototype.onSubmit = function () {
        var _this = this;
        this.customer['user_info'] = this.user_info;
        this.customer.user_info.phone = this.user_info.phone;
        this.customer.user_info.mobile = this.user_info.mobile;
        this.customer['status'] = true;
        this.customer['accounttype'] = 'customer';
        this.customer['customer_info'] = this.customer_info;
        this.customer['companies_assigned'] = this.companies_assigned;
        if (this.filesToLogo.length !== 0) {
            this.uploadLogo();
        }
        if (this.filesToPhoto.length !== 0) {
            this.uploadPhoto();
        }
        this.userService.createNewUser(this.customer).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, we cannot create a customer user right now, either the username or email address is currently being used for another user');
            }
            else {
                toastr.success('Success - New Customer Created!!!');
                _this.router.navigate(['/users']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    CustomerComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    CustomerComponent.prototype.uploadLogo = function () {
        var formData = new FormData();
        var files = this.filesToLogo;
        formData.append('uploads[]', files[0], files[0]['name']);
        this.http.post('upload', formData)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); });
        this.customer['logo'] = files[0]['name'];
    };
    CustomerComponent.prototype.uploadPhoto = function () {
        var formData = new FormData();
        var files = this.filesToPhoto;
        formData.append('uploads[]', files[0], files[0]['name']);
        this.http.post('upload', formData)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); });
        this.customer['photo'] = files[0]['name'];
    };
    CustomerComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.filesToLogo = event.target.files;
            this.logo = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event1) {
                _this.logoUrl = event1.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    CustomerComponent.prototype.readPhoto = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.filesToPhoto = event.target.files;
            this.photo = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event1) {
                _this.photoUrl = event1.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    CustomerComponent.prototype.savePermissions = function () {
        this.customer.special_permissions.customer = this.customerPermission;
        this.customer.special_permissions.staff = this.staffPermission;
        this.customer.special_permissions.store = this.storePermission;
        this.customer.special_permissions.order = this.orderPermission;
        this.customer.special_permissions.company = this.orderPermission;
        this.customer.special_permissions.role = this.rolePermission;
        this.customer.special_permissions.company = this.companyPermission;
        this.customer.special_permissions.display_dashboard = this.display_dashboard;
        this.customer.special_permissions.home_url = this.home_url;
        this.modalValid = false;
        this.customer.role_name = '';
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'customer-user',
        template: __webpack_require__(305),
        styles: [__webpack_require__(254)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_role_service__["a" /* RoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_role_service__["a" /* RoleService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_users_service__["a" /* UsersService */]) === "function" && _e || Object])
], CustomerComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=customer.component.js.map

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_role_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_stores_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StaffComponent = (function () {
    function StaffComponent(router, roleService, userService, storeService) {
        this.router = router;
        this.roleService = roleService;
        this.userService = userService;
        this.storeService = storeService;
        this.regionData = { 'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin',
                'Hauraki Gulf Islands', 'Manukau City', 'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City',
                'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
        this.stores_assigned = [];
        this.roles = [];
        this.modalValid = true;
    }
    StaffComponent.prototype.ngOnInit = function () {
        // Get Current Logged in User
        this.user = JSON.parse(localStorage.getItem('user'));
        this.staff = {
            username: '',
            parent: '',
            password: '',
            company: '',
            role_name: '',
            special_permissions: {}
        };
        this.user_info = {
            phone: '',
            mobile: ''
        };
        this.staffPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.customerPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.storePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.orderPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.rolePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.companyPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        // Get All Roles
        this.getAllRoles();
        // Get All Stores
        this.getAllStores();
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    // Get Current Roles
    StaffComponent.prototype.getAllRoles = function () {
        var _this = this;
        this.roleService.getAllRoles().then(function (res) {
            for (var i = 0; i < Object.keys(res).length; i++) {
                if (res[i].status === true) {
                    _this.roles.push(res[i]);
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    // Get All Stores
    StaffComponent.prototype.getAllStores = function () {
        var _this = this;
        this.storeService.getAllStores().then(function (res) {
            _this.stores = res;
        }, function (err) {
            console.log(err);
        });
    };
    // Select Stores assigned to staff user
    StaffComponent.prototype.selectStores = function (event) {
        if (event.target.checked) {
            this.stores_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.stores_assigned.length; i++) {
                if (this.stores_assigned[i] === event.target.value) {
                    this.stores_assigned.splice(i, 1);
                }
            }
        }
    };
    // select All permission, deselect all
    StaffComponent.prototype.selectAll = function (event) {
        if (event.target.value === 'create') {
            if (event.target.checked) {
                this.staffPermission['create'] = true;
                this.customerPermission['create'] = true;
                this.companyPermission['create'] = true;
                this.rolePermission['create'] = true;
                this.storePermission['create'] = true;
                this.orderPermission['create'] = true;
            }
            else {
                this.staffPermission['create'] = false;
                this.customerPermission['create'] = false;
                this.companyPermission['create'] = false;
                this.rolePermission['create'] = false;
                this.storePermission['create'] = false;
                this.orderPermission['create'] = false;
            }
        }
        else if (event.target.value === 'edit') {
            if (event.target.checked) {
                this.staffPermission['edit'] = true;
                this.customerPermission['edit'] = true;
                this.companyPermission['edit'] = true;
                this.rolePermission['edit'] = true;
                this.storePermission['edit'] = true;
                this.orderPermission['edit'] = true;
            }
            else {
                this.staffPermission['edit'] = false;
                this.customerPermission['edit'] = false;
                this.companyPermission['edit'] = false;
                this.rolePermission['edit'] = false;
                this.storePermission['edit'] = false;
                this.orderPermission['edit'] = false;
            }
        }
        else if (event.target.value === 'delete') {
            if (event.target.checked) {
                this.staffPermission['delete'] = true;
                this.customerPermission['delete'] = true;
                this.companyPermission['delete'] = true;
                this.rolePermission['delete'] = true;
                this.storePermission['delete'] = true;
                this.orderPermission['delete'] = true;
            }
            else {
                this.staffPermission['delete'] = false;
                this.customerPermission['delete'] = false;
                this.companyPermission['delete'] = false;
                this.rolePermission['delete'] = false;
                this.storePermission['delete'] = false;
                this.orderPermission['delete'] = false;
            }
        }
        else if (event.target.value === 'view') {
            if (event.target.checked) {
                this.staffPermission['view'] = true;
                this.customerPermission['view'] = true;
                this.companyPermission['view'] = true;
                this.rolePermission['view'] = true;
                this.storePermission['view'] = true;
                this.orderPermission['view'] = true;
            }
            else {
                this.staffPermission['view'] = false;
                this.customerPermission['view'] = false;
                this.companyPermission['view'] = false;
                this.rolePermission['view'] = false;
                this.storePermission['view'] = false;
                this.orderPermission['view'] = false;
            }
        }
    };
    StaffComponent.prototype.onSubmit = function () {
        var _this = this;
        this.staff['user_info'] = this.user_info;
        this.staff['stores_assigned'] = this.stores_assigned;
        this.staff.user_info.phone = this.user_info.phone;
        this.staff.user_info.mobile = this.user_info.mobile;
        this.staff['status'] = 'active';
        this.staff['company'] = 'Carpet Court';
        this.staff['accounttype'] = 'staff';
        if (this.staff.role_name !== '') {
            console.log(this.staff);
        }
        this.userService.createNewUser(this.staff).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry,we cannot create a customer user right now,either the username or email address is currently being used for another user');
            }
            else {
                toastr.success('Success - New Staff Created!!!');
                _this.router.navigate(['/users']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    StaffComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    StaffComponent.prototype.savePermissions = function () {
        this.staff.special_permissions.staff = this.staffPermission;
        this.staff.special_permissions.customer = this.customerPermission;
        this.staff.special_permissions.store = this.storePermission;
        this.staff.special_permissions.order = this.orderPermission;
        this.staff.special_permissions.company = this.companyPermission;
        this.staff.special_permissions.role = this.rolePermission;
        this.staff.special_permissions.display_dashboard = this.display_dashboard;
        this.staff.special_permissions.home_url = this.home_url;
        this.staff.role_name = '';
        this.modalValid = false;
    };
    return StaffComponent;
}());
StaffComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'staff-user',
        template: __webpack_require__(306),
        styles: [__webpack_require__(255)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_stores_service__["a" /* StoresService */]) === "function" && _d || Object])
], StaffComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=staff.component.js.map

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_role_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_users_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CustomerEditComponent = (function () {
    function CustomerEditComponent(http, router, roleService, companyService, userService) {
        this.http = http;
        this.router = router;
        this.roleService = roleService;
        this.companyService = companyService;
        this.userService = userService;
        this.filesToPhoto = [];
        this.modalValid = true;
        this.companies = [];
        this.companies_assigned = [];
        this.customerPermission = {};
        this.staffPermission = {};
        this.storePermission = {};
        this.orderPermission = {};
        this.rolePermission = {};
        this.companyPermission = {};
        this.roles = [];
        this.regionData = {
            'Northland': ['Far North', 'Kaipara', 'Whangarei'],
            'Auckland': ['Auckland City', 'Franklin', 'Hauraki Gulf Islands',
                'Manukau City', 'North Shore City', 'Papakura', 'Rodney', 'Waiheke Island', 'Waitakere City'],
            'Bay Of Plenty': ['Kawerau', 'Opotiki', 'Rotorua', 'Tauranga', 'Wetern Bay Of Plenty', 'Whakatane'],
            'Coromandel': ['Thames-Coromandel'],
            'Waikato': ['Hamilton', 'Hauraki', 'Matamata-Piako', 'Otorohanga', 'South Waikato', 'Waikato', 'Waipa', 'Waitomo'],
            'Gisborne': ['Gisborne'],
            'Central North Island': ['Ruapehu', 'Taupo'],
            'Hawkes Bay': ['Central Hawkes Bay', 'Hastings', 'Napier City', 'Wairoa'],
            'Taranaki': ['New Plymouth', 'South Taranaki', 'Stratford'],
            'Manawatu / Wanganui ': ['Horowhenua', 'Manawatu', 'Palmerston North City', 'Rangitikei', 'Tararua', 'Wanganui'],
            'Wairarapa': ['Carterton', 'Masterton', 'South Wairarapa'],
            'Wellington': ['Kapiti', 'Lower Hutt City', 'Porirua City', 'Upper Hutt City', 'Wellington City'],
            'Marlborough': ['Kaikoura', 'Marlborough'],
            'Nelson & Bays': ['Nelson', 'Tasman'],
            'West Coast': ['Buller', 'Grey', 'Westland'],
            'Canterbury': ['Ashburton', 'Banks Peninsula', 'Christchurch City',
                'Hurunui', 'Mackenzie', 'Selwyn', 'Timaru', 'Waimakariri', 'Waimate'],
            'Central Otago / Lakes District': ['Central Otago', 'Queenstown', 'Wanaka'],
            'Otago': ['Clutha', 'Dunedin City', 'Waitaki'],
            'Southland': ['Gore', 'Invercargill City', 'Southland']
        };
        this.regions = Object.keys(this.regionData);
    }
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        this.customer = this.user.user;
        this.user_info = this.user.user['user_info'];
        this.photoUrl = '/uploads/logo/' + this.customer.photo;
        this.customer_info = this.user.user.customer_info;
        this.cities = this.regionData[this.customer.customer_info.region];
        this.companies_assigned = this.customer['companies_assigned'];
        this.companyService.getAllCompanies().then(function (res) {
            _this.companies = res;
            for (var i = 0; i < _this.companies.length; i++) {
                for (var j = 0; j < _this.companies_assigned.length; j++) {
                    if (_this.companies[i]._id === _this.companies_assigned[j]) {
                        _this.companies[i]['checked'] = true;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
        if (this.customer.special_permissions) {
            if (Object.keys(this.customer.special_permissions).length !== 0) {
                this.companyPermission = this.customer.special_permissions.company;
                this.staffPermission = this.customer.special_permissions.staff;
                this.customerPermission = this.customer.special_permissions.customer;
                this.orderPermission = this.customer.special_permissions.order;
                this.storePermission = this.customer.special_permissions.store;
                this.rolePermission = this.customer.special_permissions.role;
                this.home_url = this.customer.special_permissions.home_url;
                this.display_dashboard = this.customer.special_permissions.display_dashboard;
            }
            else {
                this.initPermission();
            }
        }
        else {
            this.initPermission();
        }
        this.getAllRoles();
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    // init permission
    CustomerEditComponent.prototype.initPermission = function () {
        this.staffPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.customerPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.storePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.orderPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.rolePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.companyPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
    };
    // Get Current Roles
    CustomerEditComponent.prototype.getAllRoles = function () {
        var _this = this;
        this.roleService.getAllRoles().then(function (res) {
            _this.roles = res;
        }, function (err) {
            console.log(err);
        });
    };
    // Select Region
    CustomerEditComponent.prototype.selectRegion = function (event) {
        var region = event.target.value;
        this.cities = this.regionData[region];
    };
    // Select Company
    CustomerEditComponent.prototype.selectCompany = function (event) {
        if (event.target.checked) {
            this.companies_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.companies_assigned.length; i++) {
                if (event.target.value === this.companies_assigned[i]) {
                    this.companies_assigned.splice(i, 1);
                }
            }
        }
    };
    CustomerEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.customer['user_info'] = this.user_info;
        this.customer['status'] = 'active';
        this.customer['accounttype'] = 'customer';
        this.customer['customer_info'] = this.customer_info;
        this.customer['companies_assigned'] = this.companies_assigned;
        if (this.photo) {
            this.uploadPhoto();
        }
        if (this.customer.role !== '') {
            delete this.customer.special_permissions;
        }
        this.userService.updateUser(this.customer.id, this.customer).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot edit this user, please try again');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/users']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    CustomerEditComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    CustomerEditComponent.prototype.uploadPhoto = function () {
        var formData = new FormData();
        var files = this.filesToPhoto;
        formData.append('uploads[]', files[0], files[0]['name']);
        this.http.post('upload', formData)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); });
        this.customer['photo'] = files[0]['name'];
    };
    CustomerEditComponent.prototype.readPhoto = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            this.filesToPhoto = event.target.files;
            this.photo = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function (event1) {
                _this.photoUrl = event1.target.result;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    CustomerEditComponent.prototype.savePermissions = function () {
        this.customer['special_permissions'] = {};
        this.customer.special_permissions.staff = this.staffPermission;
        this.customer.special_permissions.customer = this.customerPermission;
        this.customer.special_permissions.store = this.storePermission;
        this.customer.special_permissions.order = this.orderPermission;
        this.customer.special_permissions.company = this.companyPermission;
        this.customer.special_permissions.role = this.rolePermission;
        this.customer.special_permissions.display_dashboard = this.display_dashboard;
        this.customer.special_permissions.home_url = this.home_url;
        this.customer.role = '';
        this.modalValid = false;
    };
    // select All permission, deselect all
    CustomerEditComponent.prototype.selectAll = function (event) {
        if (event.target.value === 'create') {
            if (event.target.checked) {
                this.staffPermission['create'] = true;
                this.customerPermission['create'] = true;
                this.companyPermission['create'] = true;
                this.rolePermission['create'] = true;
                this.storePermission['create'] = true;
                this.orderPermission['create'] = true;
            }
            else {
                this.staffPermission['create'] = false;
                this.customerPermission['create'] = false;
                this.companyPermission['create'] = false;
                this.rolePermission['create'] = false;
                this.storePermission['create'] = false;
                this.orderPermission['create'] = false;
            }
        }
        else if (event.target.value === 'edit') {
            if (event.target.checked) {
                this.staffPermission['edit'] = true;
                this.customerPermission['edit'] = true;
                this.companyPermission['edit'] = true;
                this.rolePermission['edit'] = true;
                this.storePermission['edit'] = true;
                this.orderPermission['edit'] = true;
            }
            else {
                this.staffPermission['edit'] = false;
                this.customerPermission['edit'] = false;
                this.companyPermission['edit'] = false;
                this.rolePermission['edit'] = false;
                this.storePermission['edit'] = false;
                this.orderPermission['edit'] = false;
            }
        }
        else if (event.target.value === 'delete') {
            if (event.target.checked) {
                this.staffPermission['delete'] = true;
                this.customerPermission['delete'] = true;
                this.companyPermission['delete'] = true;
                this.rolePermission['delete'] = true;
                this.storePermission['delete'] = true;
                this.orderPermission['delete'] = true;
            }
            else {
                this.staffPermission['delete'] = false;
                this.customerPermission['delete'] = false;
                this.companyPermission['delete'] = false;
                this.rolePermission['delete'] = false;
                this.storePermission['delete'] = false;
                this.orderPermission['delete'] = false;
            }
        }
        else if (event.target.value === 'view') {
            if (event.target.checked) {
                this.staffPermission['view'] = true;
                this.customerPermission['view'] = true;
                this.companyPermission['view'] = true;
                this.rolePermission['view'] = true;
                this.storePermission['view'] = true;
                this.orderPermission['view'] = true;
            }
            else {
                this.staffPermission['view'] = false;
                this.customerPermission['view'] = false;
                this.companyPermission['view'] = false;
                this.rolePermission['view'] = false;
                this.storePermission['view'] = false;
                this.orderPermission['view'] = false;
            }
        }
    };
    return CustomerEditComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CustomerEditComponent.prototype, "user", void 0);
CustomerEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-customeredit',
        template: __webpack_require__(307),
        styles: [__webpack_require__(256)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_role_service__["a" /* RoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_role_service__["a" /* RoleService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_company_service__["a" /* CompanyService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_users_service__["a" /* UsersService */]) === "function" && _e || Object])
], CustomerEditComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=customer.component.js.map

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_role_service__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_stores_service__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StaffEditComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StaffEditComponent = (function () {
    function StaffEditComponent(router, roleService, userService, storeService) {
        this.router = router;
        this.roleService = roleService;
        this.userService = userService;
        this.storeService = storeService;
        this.currentCompanies = [];
        this.customerPermission = {};
        this.staffPermission = {};
        this.storePermission = {};
        this.orderPermission = {};
        this.rolePermission = {};
        this.companyPermission = {};
        this.roles = [];
        this.stores = [];
        this.stores_assigned = [];
        this.modalValid = true;
    }
    StaffEditComponent.prototype.ngOnInit = function () {
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        this.roles = [];
        this.stores = [];
        this.staff = this.user.user;
        this.stores_assigned = this.staff['stores_assigned'];
        this.user_info = this.user.user['user_info'];
        if (this.staff.special_permissions) {
            if (Object.keys(this.staff.special_permissions).length !== 0) {
                this.companyPermission = this.staff.special_permissions.company;
                this.staffPermission = this.staff.special_permissions.staff;
                this.customerPermission = this.staff.special_permissions.customer;
                this.orderPermission = this.staff.special_permissions.order;
                this.storePermission = this.staff.special_permissions.store;
                this.rolePermission = this.staff.special_permissions.role;
                this.home_url = this.staff.special_permissions.home_url;
                this.display_dashboard = this.staff.special_permissions.display_dashboard;
            }
            else {
                this.initPermission();
            }
        }
        else {
            this.initPermission();
        }
        this.getAllRoles();
        this.getAllStores();
        // Init UI elements
        toastr.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-bottom-right',
            'closeButton': true,
            'progressBar': true
        };
    };
    // Init Permission
    StaffEditComponent.prototype.initPermission = function () {
        this.staffPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.customerPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.storePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.orderPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.rolePermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
        this.companyPermission = {
            'create': false,
            'edit': false,
            'delete': false,
            'view': false
        };
    };
    // Get All Stores
    StaffEditComponent.prototype.getAllStores = function () {
        var _this = this;
        this.storeService.getAllStores().then(function (res) {
            _this.stores = res;
            for (var i = 0; i < _this.stores.length; i++) {
                for (var j = 0; j < _this.stores_assigned.length; j++) {
                    if (_this.stores[i]._id === _this.stores_assigned[j]) {
                        _this.stores[i].checked = true;
                    }
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    // Get Current Roles
    StaffEditComponent.prototype.getAllRoles = function () {
        var _this = this;
        this.roleService.getAllRoles().then(function (res) {
            _this.roles = res;
        }, function (err) {
            console.log(err);
        });
    };
    // Select Role
    StaffEditComponent.prototype.selectRole = function (event) {
        this.staff.role = event.target.value;
        if (this.staff.special_permissions) {
            delete this.staff.special_permissions;
        }
    };
    // Select Stores assigned to staff user
    StaffEditComponent.prototype.selectStores = function (event) {
        if (event.target.checked) {
            this.stores_assigned.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.stores_assigned.length; i++) {
                if (this.stores_assigned[i] === event.target.value) {
                    this.stores_assigned.splice(i, 1);
                }
            }
        }
    };
    // Save Special Permissions
    StaffEditComponent.prototype.savePermissions = function () {
        this.staff['special_permissions'] = {};
        this.staff.special_permissions.staff = this.staffPermission;
        this.staff.special_permissions.customer = this.customerPermission;
        this.staff.special_permissions.store = this.storePermission;
        this.staff.special_permissions.order = this.orderPermission;
        this.staff.special_permissions.company = this.companyPermission;
        this.staff.special_permissions.role = this.rolePermission;
        this.staff.special_permissions.display_dashboard = this.display_dashboard;
        this.staff.special_permissions.home_url = this.home_url;
        this.staff.role = '';
        this.modalValid = false;
    };
    // select All permission, deselect all
    StaffEditComponent.prototype.selectAll = function (event) {
        if (event.target.value === 'create') {
            if (event.target.checked) {
                this.staffPermission['create'] = true;
                this.customerPermission['create'] = true;
                this.companyPermission['create'] = true;
                this.rolePermission['create'] = true;
                this.storePermission['create'] = true;
                this.orderPermission['create'] = true;
            }
            else {
                this.staffPermission['create'] = false;
                this.customerPermission['create'] = false;
                this.companyPermission['create'] = false;
                this.rolePermission['create'] = false;
                this.storePermission['create'] = false;
                this.orderPermission['create'] = false;
            }
        }
        else if (event.target.value === 'edit') {
            if (event.target.checked) {
                this.staffPermission['edit'] = true;
                this.customerPermission['edit'] = true;
                this.companyPermission['edit'] = true;
                this.rolePermission['edit'] = true;
                this.storePermission['edit'] = true;
                this.orderPermission['edit'] = true;
            }
            else {
                this.staffPermission['edit'] = false;
                this.customerPermission['edit'] = false;
                this.companyPermission['edit'] = false;
                this.rolePermission['edit'] = false;
                this.storePermission['edit'] = false;
                this.orderPermission['edit'] = false;
            }
        }
        else if (event.target.value === 'delete') {
            if (event.target.checked) {
                this.staffPermission['delete'] = true;
                this.customerPermission['delete'] = true;
                this.companyPermission['delete'] = true;
                this.rolePermission['delete'] = true;
                this.storePermission['delete'] = true;
                this.orderPermission['delete'] = true;
            }
            else {
                this.staffPermission['delete'] = false;
                this.customerPermission['delete'] = false;
                this.companyPermission['delete'] = false;
                this.rolePermission['delete'] = false;
                this.storePermission['delete'] = false;
                this.orderPermission['delete'] = false;
            }
        }
        else if (event.target.value === 'view') {
            if (event.target.checked) {
                this.staffPermission['view'] = true;
                this.customerPermission['view'] = true;
                this.companyPermission['view'] = true;
                this.rolePermission['view'] = true;
                this.storePermission['view'] = true;
                this.orderPermission['view'] = true;
            }
            else {
                this.staffPermission['view'] = false;
                this.customerPermission['view'] = false;
                this.companyPermission['view'] = false;
                this.rolePermission['view'] = false;
                this.storePermission['view'] = false;
                this.orderPermission['view'] = false;
            }
        }
    };
    StaffEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.staff['user_info'] = this.user_info;
        this.staff['status'] = 'active';
        this.staff['accounttype'] = 'staff';
        this.staff['company'] = 'Carpet Court';
        if (this.staff.role !== '') {
            delete this.staff.special_permissions;
        }
        this.userService.updateUser(this.staff['id'], this.staff).then(function (result) {
            if (!result['success']) {
                toastr.error('Sorry, cannot edit this user, please try again');
            }
            else {
                toastr.success('Success !!!');
                _this.router.navigate(['/users']);
            }
        }, function (err) {
            console.log(err);
        });
    };
    StaffEditComponent.prototype.cancel = function () {
        this.router.navigate(['/users']);
    };
    return StaffEditComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], StaffEditComponent.prototype, "user", void 0);
StaffEditComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'edit-staff',
        template: __webpack_require__(308),
        styles: [__webpack_require__(257)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_role_service__["a" /* RoleService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_users_service__["a" /* UsersService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_stores_service__["a" /* StoresService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_stores_service__["a" /* StoresService */]) === "function" && _d || Object])
], StaffEditComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=staff.component.js.map

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_users_service__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserComponent = (function () {
    function UserComponent(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.user = {};
        this.getUserDetails(this.route.snapshot.params['id']);
    };
    UserComponent.prototype.getUserDetails = function (id) {
        var _this = this;
        this.userService.getUserDetails(id).then(function (res) {
            _this.user = res;
            _this.accounttype = _this.user.user.accounttype;
        }, function (err) {
            console.log(err);
        });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-user',
        template: __webpack_require__(309),
        styles: [__webpack_require__(258)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_users_service__["a" /* UsersService */]) === "function" && _c || Object])
], UserComponent);

var _a, _b, _c;
//# sourceMappingURL=user.component.js.map

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_users_service__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_company_service__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsersComponent = (function () {
    function UsersComponent(usersService, companyService, route, router) {
        this.usersService = usersService;
        this.companyService = companyService;
        this.route = route;
        this.router = router;
        this.loading = false;
        this.companies = [];
        this.users = [];
        this.childs = [];
        this.temp = [];
        this.selectedUsers = [];
        this.user = JSON.parse(localStorage.getItem('user'));
        if (this.user.special_permissions) {
            this.user_permission = this.user.special_permissions;
        }
        if (this.user.role) {
            this.user_permission = this.user.role;
        }
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.filterUserType = '';
        this.getAllUsers();
    };
    UsersComponent.prototype.filter = function () {
        if (this.user.accounttype === 'super' || this.user.accounttype === 'staff') {
            var temp1 = [];
            if (this.filterUserType === 'all') {
                temp1 = this.users;
            }
            else {
                for (var i = 0; i < this.users.length; i++) {
                    if (this.users[i].accounttype === this.filterUserType) {
                        temp1.push(this.users[i]);
                    }
                }
            }
            this.temp = temp1;
        }
        if (this.user.accounttype === 'customer') {
            var temp1 = [];
            if (this.filterUserType === 'all') {
                temp1 = this.users;
            }
            else {
                for (var i = 0; i < this.users.length; i++) {
                    if (this.users[i].accounttype === this.filterUserType) {
                        temp1.push(this.users[i]);
                    }
                }
            }
            this.childs = temp1;
        }
    };
    UsersComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.loading = true;
        this.companyService.getAllCompanies().then(function (res) {
            _this.companies = res;
            if (_this.user.accounttype === 'super' || _this.user.accounttype === 'staff') {
                _this.usersService.getAllUsers().then(function (respond) {
                    _this.loading = false;
                    _this.users = respond;
                    _this.temp = _this.users;
                }, function (error) {
                    _this.loading = false;
                    console.log(error);
                });
            }
            if (_this.user.accounttype === 'customer') {
                var companies = [];
                var stores = [];
                for (var i = 0; i < _this.companies.length; i++) {
                    companies.push(_this.companies[i]._id);
                    for (var j = 0; j < _this.companies[i]['assigned_stores'].length; j++) {
                        stores.push(_this.companies[i]['assigned_stores'][j]);
                    }
                    stores = Array.from(new Set(stores));
                }
                _this.usersService.getAllCustomers(companies).then(function (respond) {
                    _this.loading = false;
                    if (_this.user_permission.customer.create || _this.user_permission.customer.edit ||
                        _this.user_permission.customer.delete || _this.user_permission.customer.view) {
                        _this.childs = respond;
                    }
                }, function (error) {
                    _this.loading = false;
                    console.log(error);
                });
                if (_this.user_permission.staff.create || _this.user_permission.staff.edit ||
                    _this.user_permission.staff.delete || _this.user_permission.staff.view) {
                    _this.usersService.getStaffOfCustomer(stores).then(function (respond) {
                        _this.loading = false;
                        for (var i = 0; i < Object.keys(respond).length; i++) {
                            _this.childs.push(respond[i]);
                        }
                    }, function (error) {
                        _this.loading = false;
                        console.log(error);
                    });
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    UsersComponent.prototype.selectElement = function (event) {
        if (event.target.checked) {
            this.selectedUsers.push(event.target.value);
        }
        else {
            for (var i = 0; i < this.selectedUsers.length; i++) {
                if (this.selectedUsers[i] === event.target.value) {
                    this.selectedUsers.splice(i, 1);
                }
            }
        }
    };
    UsersComponent.prototype.inActivateUsers = function () {
        var _this = this;
        this.usersService.inActivateUser(this.selectedUsers).subscribe(function (data) {
            _this.getAllUsers();
            _this.selectedUsers = [];
        });
    };
    UsersComponent.prototype.reActivateUsers = function () {
        var _this = this;
        this.usersService.deActivateUsers(this.selectedUsers).subscribe(function (data) {
            _this.getAllUsers();
            _this.selectedUsers = [];
        });
    };
    UsersComponent.prototype.deleteUsers = function () {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover selected users!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function () {
            _this.usersService.deleteUsers(_this.selectedUsers).subscribe(function (data) {
                _this.getAllUsers();
                _this.selectedUsers = [];
            });
            swal('Deleted!', 'Selected Users has been deleted.', 'success');
        }, function (dismiss) {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
                swal('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    UsersComponent.prototype.createNewUser = function () {
        this.router.navigate(['/user']);
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-users',
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        template: __webpack_require__(310),
        styles: [__webpack_require__(259)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_users_service__["a" /* UsersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_users_service__["a" /* UsersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_company_service__["a" /* CompanyService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _d || Object])
], UsersComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=users.component.js.map

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".row {\r\n    margin-top: 8em;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".parent_list {\r\n    list-style: none;\r\n    padding-left: 0px;\r\n}\r\n\r\n#tree_sign {\r\n    font-size: 20px;\r\n}\r\n\r\n.parent_list {\r\n    padding-left: 0px;\r\n}\r\n\r\n.company_title {\r\n    font-size: 16px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "ul {\r\n\tborder-bottom: 1px solid;\r\n\tlist-style: none;\r\n}\r\n.villages_list {\r\n\theight:200px;\r\n\twidth:100%;\r\n\toverflow:hidden;\r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\n.sub_list {\r\n\tborder: none;\r\n}\r\n\r\n.child {\r\n\tcursor: pointer;\r\n\tcolor: blue;\r\n}\r\n\r\n.modal-header {\r\n\tbackground-color: #01a8fe;\r\n\tcolor: white;\r\n}\r\n\r\n.modal-content {\r\n\tborder-radius: 0px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "ul {\r\n\tborder-bottom: 1px solid;\r\n\tlist-style: none;\r\n}\r\n.villages_list {\r\n\theight:200px;\r\n\twidth:100%;\r\n\toverflow:hidden;\r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\n.sub_list {\r\n\tborder: none;\r\n}\r\n.child {\r\n\tcursor: pointer;\r\n\tcolor: blue;\r\n}\r\n\r\n.modal-header {\r\n\tbackground-color: #01a8fe;\r\n\tcolor: white;\r\n}\r\n\r\n.modal-content {\r\n\tborder-radius: 0px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\r\n.logo {\r\n\ttext-align: center;\r\n\tmin-width: 50%;\r\n\tmin-height: 50%;\r\n\tmax-height: 50%;\r\n}\r\n.row {\r\n    margin-top: 10%;\r\n    margin-left: -15%\r\n}\r\n@media screen and (max-width: 991px) and (min-width: 320px) {\r\n    .row {\r\n        margin-left: 0;\r\n    }\r\n\r\n    .login_logo {\r\n    \theight: 10%;\r\n    }\r\n}\r\n\r\n.login_logo {\r\n\tmin-width: 50%;\r\n\tmin-height: 10%;\r\n\tmax-height: 50%;\r\n\twidth: 70%;\r\n\theight: 70%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, " .td-title {\r\n     width: 30%;\r\n     color:  white;\r\n     background-color: #364150;\r\n }\r\n\r\n .order-input {\r\n     border: none;\r\n     margin: 0; \r\n     width: 100%;\r\n }\r\n\r\n td {\r\n \tpadding: .2em;\r\n }\r\ninput {\r\n padding: .3em .5em;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".invnum {\r\n\tcolor: #23527c;\r\n\tcursor: pointer;\r\n}\r\n\r\n.modal-dialog {\r\n\tmargin-top: 15%;\r\n}\r\n\r\n.item_field {\r\n\ttext-align: right;\r\n}\r\n\r\n.modal-header {\r\n\tbackground-color: #01a8fe;\r\n\tcolor: white;\r\n}\r\n\r\n.modal-content {\r\n\tborder-radius: 0px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".go_back {\r\n    cursor: pointer;\r\n    color: #4caf50;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\n.form-control {\r\n\tfont-size: 15px;\r\n}\r\n\r\nspan {\r\n\tmargin-left: 30px;\r\n}\r\n\r\n.invnum {\r\n\tcolor: #23527c;\r\n\tcursor: pointer;\r\n}\r\n\r\n.modal-dialog {\r\n\tmargin-top: 15%;\r\n}\r\n\r\n.item_field {\r\n\ttext-align: right;\r\n}\r\n\r\n.modal-header {\r\n\tbackground-color: #01a8fe;\r\n\tcolor: white;\r\n}\r\n\r\n.modal-content {\r\n\tborder-radius: 0px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\n.form-control {\r\n\tfont-size: 19px;\r\n}\r\n\r\nspan {\r\n\tmargin-left: 30px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\n.form-control {\r\n\tfont-size: 19px;\r\n}\r\n\r\nspan {\r\n\tmargin-left: 30px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\n.form-control {\r\n\tfont-size: 19px;\r\n}\r\n\r\nspan {\r\n\tmargin-left: 30px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px;\r\n\twidth:100%;\r\n\toverflow:hidden;\r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".password_not_match {\r\n\tcolor: #a94442;\r\n}\r\n\r\n.villages_list {\r\n\theight:300px;\r\n\twidth:100%;\r\n\toverflow:hidden;\r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n/*span {\r\n\tmargin-left: 30px;\r\n}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".password_not_match {\r\n\tcolor: #a94442;\r\n}\r\n\r\n.villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\nli span {\r\n\tmargin-left: 25px;\r\n\tfont-size: 16px;\r\n}\r\n\r\nli {\r\n\tborder-top: 1px solid grey;\r\n}\r\n\r\n.edit-store {\r\n\tcolor: #23527c;\r\n\tmargin-left: 25px;\r\n\tcursor: pointer;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px;\r\n\twidth:100%;\r\n\toverflow:hidden;\r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n/*span {\r\n\tmargin-left: 30px;\r\n}*/", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".villages_list {\r\n\theight:300px; \r\n\twidth:100%;\r\n\toverflow:hidden; \r\n\toverflow-y:scroll;\r\n\tlist-style:none;\r\n}\r\n\r\nli span {\r\n\tmargin-left: 25px;\r\n\tfont-size: 16px;\r\n}\r\n\r\nli {\r\n\tborder-top: 1px solid grey;\r\n}\r\n\r\n.edit-store {\r\n\tcolor: #23527c;\r\n\tmargin-left: 25px;\r\n\tcursor: pointer;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */
/***/ (function(module, exports) {

module.exports = "<!-- header -->\n<div *ngIf=\"!routeState\">\n    <app-header></app-header>\n    <!-- END HEADER -->\n    <div class=\"clearfix\"> </div>\n</div>\n<!-- BEGIN CONTAINER -->\n<div class=\"page-container\">\n    <!--  nav -->\n    <app-navmenu *ngIf=\"!routeState\"></app-navmenu>\n    <!-- BEGIN CONTENT BODY -->\n    <div class=\"page-content-wrapper\">\n        <div class=\"content-wrapper container\">\n            <router-outlet></router-outlet>\n        </div>\n    </div>\n\n</div>\n<!-- END CONTAINER -->\n\n\n<!-- SCROLL TO TOP -->\n<a href=\"#\" id=\"toTop\"></a>\n\n\n<!-- PRELOADER -->\n<div id=\"preloader\">\n    <div class=\"inner\">\n        <span class=\"loader\"></span>\n    </div>\n</div>\n<!-- /PRELOADER -->"

/***/ }),
/* 270 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container text-center\">\n<div class=\"row\">\n  <div class=\"alert alert-danger\">\n    <strong>\n      You have no permissions now.\n    </strong>\n  </div>\n</div>\n  \n\n</div>"

/***/ }),
/* 271 */
/***/ (function(module, exports) {

module.exports = "<ng-template #itemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\n    <div class=\"form-check\">\n        <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\" [class.fa-caret-down]=\"!item.collapsed\"></i>\n        <label class=\"form-check-label\">\n            <input type=\"checkbox\" class=\"form-check-input\" [(ngModel)]=\"item.checked\" (change)=\"selectItem($event)\" [disabled]=\"item.disabled\" [value]=\"item.value\" />\n            <ng-container *ngIf=\"user.accounttype === 'super'\" >\n                <a [routerLink]=\"['/companies', item.value]\" class=\"company_title\">{{item.text}}</a>\n            </ng-container>\n            <ng-container *ngIf=\"user.accounttype ==='staff' || user.accounttype==='customer'\" >\n                <a [routerLink]=\"['/companies', item.value]\" *ngIf=\"company_permission.edit\" class=\"company_title\">{{item.text}}</a>\n                <ng-container *ngIf=\"!company_permission.edit\"><span class=\"company_title\">{{item.text}}</span></ng-container>\n            </ng-container>\n        </label>\n    </div>\n</ng-template>\n\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Company Management</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Company Management</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <ngx-loading [show]=\"loading\"></ngx-loading>\n        <div class=\"form-group\">\n            <ng-container *ngIf=\"user.accounttype === 'super'\">\n                <a [routerLink]=\"['/companies/create']\" class=\"btn btn-primary\"><i class=\"fa fa-bank\"></i> Register New Company</a>\n            </ng-container>\n            <ng-container *ngIf=\"user.accounttype === 'staff' || user.accounttype === 'customer'\">\n                <a [routerLink]=\"['/companies/create']\" *ngIf=\"company_permission.create\" class=\"btn btn-primary\"><i class=\"fa fa-bank\"></i> Register New Company</a>\n            </ng-container>\n        </div>\n        <div class=\"col-md-12 col-sm-12\">\n            <ng-container *ngIf=\"user.accounttype === 'super'\">\n                <ngx-treeview [config]=\"config\" [items]=\"items\" [itemTemplate]=\"itemTemplate\" (selectedChange)=\"onSelectedChange($event)\">\n                </ngx-treeview>\n            </ng-container>\n            <ng-container *ngIf=\"user.accounttype ==='staff' || user.accounttype==='customer'\">\n                <ngx-treeview *ngIf=\"company_permission.create || company_permission.edit || company_permission.delete || company_permission.view\" [config]=\"config\" [items]=\"items\" [itemTemplate]=\"itemTemplate\" (selectedChange)=\"onSelectedChange($event)\">\n                </ngx-treeview>\n            </ng-container>\n        </div>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-sm-12 col-md-12\">\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'super'\">\n            <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"deleteComapnies()\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n            <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deactivateComapnies()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n            <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"reactivateComapnies()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n        </div>\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'staff' || user.accounttype === 'customer' \">\n            <button type=\"button\" *ngIf=\"company_permission.delete\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deactivateComapnies()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n            <button type=\"button\" *ngIf=\"company_permission.delete\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"reactivateComapnies()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 272 */
/***/ (function(module, exports) {

module.exports = "<ng-template #itemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\r\n    <div class=\"form-check\">\r\n        <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\" [class.fa-caret-down]=\"!item.collapsed\"></i>\r\n        <label class=\"form-check-label\">\r\n                <ng-container *ngIf=\"user.accounttype === 'super'\" >\r\n                    <a href=\"/#/companies/{{item.value}}\">{{item.text}}</a>\r\n                </ng-container>\r\n                <ng-container *ngIf=\"user.accounttype ==='staff' || user.accounttype==='customer'\" >\r\n                    <a href=\"/#/companies/{{item.value}}\" *ngIf=\"company_permission.edit\" >{{item.text}}</a>\r\n                    <ng-container *ngIf=\"!company_permission.edit\">{{item.text}}</ng-container>\r\n                </ng-container>\r\n            </label>\r\n    </div>\r\n</ng-template>\r\n\r\n<!-- page title -->\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"page-title\">\r\n            <div class=\"row\">\r\n                <h4 class=\"pull-left\">Create New Company</h4>\r\n                <ol class=\"breadcrumb pull-right\">\r\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\r\n                    <li>Create New Company</li>\r\n                </ol>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end .page title-->\r\n<div class=\"hr-line-dashed\"></div>\r\n<div class=\"row\">\r\n    <form class=\"form-horizontal group-border stripped\" #createCompanyForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\r\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\r\n            <div class=\"panel panel-card margin-b-30\">\r\n                <div class=\"well\">\r\n                    <h4 class=\"mb-xlg\">Company Information</h4>\r\n                    <div class=\"panel-body\">\r\n                        <div class=\"form-group\">\r\n                            <div class=\"col-lg-4 col-md-4 col-md-offset-4\">\r\n                                <img [src]=\"logoUrl\" alt=\"Preview\" class=\"img-thumbnail img-responsive\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Logo</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"file\" name=\"logo\" (change)=\"readUrl($event)\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': name.touched && name.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Company Name</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" name=\"name\" placeholder=\"Enter Company Name\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"company.name\" #name=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <h5 class=\"mb-xlg\">Address Information</h5>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address1.touched && address1.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Address</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" placeholder=\"\" class=\"form-control\" name=\"address1\" [(ngModel)]=\"address.address1\" #address1=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address2.touched && address2.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\"></label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" class=\"form-control\" name=\"address2\" [(ngModel)]=\"address.address2\" #address2=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': region.touched && region.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Region</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <select class=\"fancy-select form-control\" name=\"region\" [(ngModel)]=\"company_info.region\" (change)=\"selectRegion($event)\" #region=\"ngModel\" required>\r\n                                <option *ngFor=\"let reg of regions\" [value]=\"reg\">{{ reg }}</option>\r\n                            </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': city.touched && city.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">City</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <select class=\"fancy-select form-control\" name=\"city\" [(ngModel)]=\"company_info.city\" name=\"city\" #city=\"ngModel\" required>\r\n                                <option *ngFor=\"let city of cities\" [value]=\"city\">{{city}}</option>\r\n                            </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': post_code.touched && post_code.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Post Code</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" placeholder=\"Enter Post Code\" name=\"post_code\" class=\"form-control\" [(ngModel)]=\"company_info.postcode\" #post_code=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <h5 class=\"mb-xlg\">Additional Information</h5>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': account_email.touched && account_email.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Accounts Email</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"company.email\" #account_email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': customer_type.touched && customer_type.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Customer Type</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" name=\"customer_type\" class=\"form-control\" [(ngModel)]=\"company_info.customer_type\" #customer_type=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Parent</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <select class=\"fancy-select form-control\" name=\"parent\" [(ngModel)]=\"company.parent\" #parent=\"ngModel\" (change)=\"selectParent($event)\">\r\n                                <option value=\"\" selected=\"\"></option>\r\n                                <option *ngFor=\"let item of companies\" [value]=\"item._id\">{{ item.name }}</option>\r\n                            </select>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Assigned To Stores</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <ul class=\"villages_list\">\r\n                                    <li *ngFor=\"let item of stores\">\r\n                                        <input type=\"checkbox\" [value]=\"item\" (change)=\"selectStore(item, $event)\">\r\n                                        <span>{{item.store_title}}</span>\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Key Contact</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <ul class=\"villages_list\">\r\n                                    <li *ngFor=\"let item of assigned_staffs\">\r\n                                        <span>{{item.store}}</span>\r\n                                        <ul class=\"sub_list\">\r\n                                            <li *ngFor=\"let s of item.assigned_staffs\">\r\n                                                <input type=\"radio\" [name]=\"item.store\" [value]=\"s.id\" (change)=\"selectKeyContact(item, $event)\"> {{s.username}}\r\n                                            </li>\r\n                                        </ul>\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\r\n            <div class=\"panel panel-card margin-b-30\">\r\n                <div class=\"well\">\r\n                    <h4 class=\"mb-xlg\">Account Information</h4>\r\n                    <div class=\"panel-body\">\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Bank Account</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" name=\"bank_account\" placeholder=\"Enter Bank Account\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.bank_account\" #bank_account=\"ngModel\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">GST Number</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" name=\"gst_number\" placeholder=\"Enter GST Number\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.gst_number\" #gst_number=\"ngModel\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': payable_email.touched && payable_email.invalid }\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Accounts Payable Email</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"text\" name=\"payable_email\" placeholder=\"Enter Accounts Payable Email\" class=\"form-control\" [(ngModel)]=\"account_info.payable_email\" #payable_email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Is a debtor?</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <input type=\"checkbox\" name=\"is_debtor\" [checked]=\"company.is_debtor\" (change)=\"company.is_debtor = !company.is_debtor\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-4 col-md-4 control-label\">Company Structure</label>\r\n                            <div class=\"col-lg-8 col-md-8\">\r\n                                <ngx-treeview [config]=\"config\" [items]=\"items\" [itemTemplate]=\"itemTemplate\">\r\n                                </ngx-treeview>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"modal fade\" id=\"detailModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\r\n                            <div class=\"modal-dialog\">\r\n                                <div class=\"modal-content\">\r\n                                    <div class=\"modal-header text-center\">\r\n                                        <h4 class=\"modal-title\">Company Details</h4>\r\n                                    </div>\r\n                                    <div class=\"modal-body\">\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Name:</strong> </div>\r\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child.name}}</span></div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Is Debtor?</strong></div>\r\n                                            <div class=\"col-sm-4 col-xs-4\"><input type=\"checkbox\" [checked]=\"child.is_debtor\" disabled></div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Email</strong></div>\r\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child.email}}</span></div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Region</strong></div>\r\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_info.region}}</span></div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>City</strong></div>\r\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_info.city}}</span></div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Address</strong></div>\r\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_address.address1}}</span></div>\r\n                                        </div>\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong></strong></div>\r\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_address.address2}}</span></div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"text-center\">\r\n                        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!createCompanyForm.form.valid\">Submit</button>\r\n                        <button type=\"reset\" class=\"btn btn-default\">Reset</button>\r\n                        <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">Cancel</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>"

/***/ }),
/* 273 */
/***/ (function(module, exports) {

module.exports = "<ng-template #itemTemplate let-item=\"item\" let-onCollapseExpand=\"onCollapseExpand\" let-onCheckedChange=\"onCheckedChange\">\n    <div class=\"form-check\">\n        <i *ngIf=\"item.children\" (click)=\"onCollapseExpand()\" aria-hidden=\"true\" class=\"fa\" [class.fa-caret-right]=\"item.collapsed\" [class.fa-caret-down]=\"!item.collapsed\"></i>\n        <label class=\"form-check-label\">\n                    <ng-container *ngIf=\"user.accounttype === 'super'\" >\n                        <a href=\"/#/companies/{{item.value}}\">{{item.text}}</a>\n                    </ng-container>\n                    <ng-container *ngIf=\"user.accounttype ==='staff' || user.accounttype==='customer'\" >\n                        <a href=\"/#/companies/{{item.value}}\" *ngIf=\"company_permission.edit\" >{{item.text}}</a>\n                        <ng-container *ngIf=\"!company_permission.edit\">{{item.text}}</ng-container>\n                    </ng-container>\n                </label>\n    </div>\n</ng-template>\n\n<!-- page title -->\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Create New Company</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Create New Company</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n<div class=\"hr-line-dashed\"></div>\n<div class=\"row\">\n    <form class=\"form-horizontal group-border stripped\" #editCompanyForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\n            <div class=\"panel panel-card margin-b-30\">\n                <div class=\"well\">\n                    <h4 class=\"mb-xlg\">Company Information</h4>\n                    <div class=\"panel-body\">\n                        <div class=\"form-group\">\n                            <div class=\"col-lg-4 col-md-4 col-md-offset-4\">\n                                <img [src]=\"logoUrl\" alt=\"Preview\" class=\"img-thumbnail img-responsive\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Logo</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"file\" name=\"logo\" (change)=\"readUrl($event)\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': name.touched && name.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Company Name</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"name\" placeholder=\"Enter Company Name\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"currentCompany.name\" #name=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <h5 class=\"mb-xlg\">Address Information</h5>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address1.touched && address1.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Address</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" placeholder=\"\" class=\"form-control\" name=\"address1\" [(ngModel)]=\"address.address1\" #address1=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address2.touched && address2.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\"></label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" class=\"form-control\" name=\"address2\" [(ngModel)]=\"address.address2\" #address2=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': region.touched && region.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Region</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"region\" [(ngModel)]=\"company_info.region\" (change)=\"selectRegion($event)\" #region=\"ngModel\" required>\n                                <option *ngFor=\"let reg of regions\" [value]=\"reg\">{{ reg }}</option>\n                            </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': city.touched && city.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">City</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"city\" [(ngModel)]=\"company_info.city\" name=\"city\" #city=\"ngModel\" required>\n                                <option *ngFor=\"let city of cities\" [value]=\"city\">{{city}}</option>\n                            </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': post_code.touched && post_code.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Post Code</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" placeholder=\"Enter Post Code\" name=\"post_code\" class=\"form-control\" [(ngModel)]=\"company_info.postcode\" #post_code=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <h5 class=\"mb-xlg\">Additional Information</h5>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': account_email.touched && account_email.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Accounts Email</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"currentCompany.email\" #account_email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': customer_type.touched && customer_type.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Customer Type</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"customer_type\" class=\"form-control\" [(ngModel)]=\"company_info.customer_type\" #customer_type=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Parent</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"parent\" [(ngModel)]=\"currentCompany.parent\" #parent=\"ngModel\" (click)=\"selectParent($event)\">\n                                <option value=\"\" selected=\"\"></option>\n                                <option *ngFor=\"let item of companies\" [value]=\"item._id\">{{ item.name }}</option>\n                            </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Assigned To Stores</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <ul class=\"villages_list\">\n                                    <li *ngFor=\"let item of stores\">\n                                        <input type=\"checkbox\" [value]=\"item\" [checked]=\"item.checked\" (change)=\"selectStore(item, $event)\">\n                                        <span>{{item.store_title}}</span>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Key Contact</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <ul class=\"villages_list\">\n                                    <li *ngFor=\"let item of key_contacts\">\n                                        <ng-container *ngFor=\"let store of stores\">\n                                            <ng-container *ngIf=\"item.store === store._id\">\n                                                <span>{{store.store_title}}</span>\n                                                <ul class=\"sub_list\">\n                                                    <li *ngFor=\"let staff of store.assigned_users\">\n                                                        <ng-container *ngFor=\"let user of users\">\n                                                            <ng-container *ngIf=\"user._id === staff\">\n                                                                <input type=\"radio\" [checked]=\"user._id === item.key_staff\" [name]=\"store.store_title\" [value]=\"user._id\" (change)=\"selectKeyContact(store._id, $event)\">\n                                                                <span>{{user.username}}</span>\n                                                            </ng-container>\n                                                        </ng-container>\n                                                    </li>\n                                                </ul>\n                                            </ng-container>\n                                        </ng-container>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\n            <div class=\"panel panel-card margin-b-30\">\n                <div class=\"well\">\n                    <h4 class=\"mb-xlg\">Account Information</h4>\n                    <div class=\"panel-body\">\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Bank Account</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"bank_account\" placeholder=\"Enter Bank Account\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.bank_account\" #bank_account=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">GST Number</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"gst_number\" placeholder=\"Enter GST Number\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.gst_number\" #gst_number=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': payable_email.touched && payable_email.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Accounts Payable Email</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"payable_email\" placeholder=\"Enter Accounts Payable Email\" class=\"form-control\" [(ngModel)]=\"account_info.payable_email\" #payable_email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Is a debtor?</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"checkbox\" name=\"is_debtor\" [checked]=\"currentCompany.is_debtor\" (change)=\"currentCompany.is_debtor = !currentCompany.is_debtor\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Company Structure</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <ngx-treeview [config]=\"config\" [items]=\"items\" [itemTemplate]=\"itemTemplate\">\n                                </ngx-treeview>\n                            </div>\n                        </div>\n                        <div class=\"modal fade\" id=\"detailModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n                            <div class=\"modal-dialog\">\n                                <div class=\"modal-content\">\n                                    <div class=\"modal-header text-center\">\n                                        <h4 class=\"modal-title\">Company Details</h4>\n                                    </div>\n                                    <div class=\"modal-body\">\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Name:</strong> </div>\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child.name}}</span></div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Is Debtor?</strong></div>\n                                            <div class=\"col-sm-4 col-xs-4\"><input type=\"checkbox\" [checked]=\"child.is_debtor\" disabled></div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Email</strong></div>\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child.email}}</span></div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Region</strong></div>\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_info.region}}</span></div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>City</strong></div>\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_info.city}}</span></div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Address</strong></div>\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_address.address1}}</span></div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-4 col-xs-4 item_field\"><strong></strong></div>\n                                            <div class=\"col-sm-4 col-xs-4\"><span>{{child_address.address2}}</span></div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"text-center\">\n                        <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!editCompanyForm.form.valid\">Submit</button>\n                        <button type=\"reset\" class=\"btn btn-default\">Reset</button>\n                        <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">Cancel</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>"

/***/ }),
/* 274 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n\n                <h4 class=\"pull-left\">Dashboard</h4>\n\n\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Dashboard</li>\n                </ol>\n\n            </div>\n        </div>\n    </div>\n</div><!-- end .page title-->\n\n<div class=\"row\">\n    <div class=\"col-md-6 col-lg-3\">\n        <div class=\"panel panel-card recent-activites\">\n            <!-- Start .panel -->\n            <div class=\"panel-heading\">\n                HEADING\n                <div class=\"pull-right\">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                        <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"panel-body text-center\">\n                <i class=\"icon-layers widget-icon\"></i>  <h1 class=\"right panel-middle margin-b-0\">3,100</h1>\n            </div>\n        </div><!-- End .panel --> \n\n\n\n        </div>\n        <div class=\"col-md-6 col-lg-3\">\n            <div class=\"panel panel-card recent-activites\">\n                <!-- Start .panel -->\n                <div class=\"panel-heading\">\n                    HEADING\n                    <div class=\"pull-right\">\n                        <div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                            <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                                <li><a href=\"#\">Action</a></li>\n                                <li><a href=\"#\">Another action</a></li>\n                                <li><a href=\"#\">Something else here</a></li>\n                                <li class=\"divider\"></li>\n                                <li><a href=\"#\">Separated link</a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"panel-body text-center\">\n                    <i class=\"icon-user widget-icon\"></i>  <h1 class=\"right panel-middle margin-b-0\">6,782</h1>\n                </div>\n            </div><!-- End .panel --> \n\n\n\n        </div>\n\n        <div class=\"col-md-6 col-lg-3\">\n            <div class=\"panel panel-card recent-activites\">\n                <!-- Start .panel -->\n                <div class=\"panel-heading\">\n                    HEADING\n                    <div class=\"pull-right\">\n                        <div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                            <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                                <li><a href=\"#\">Action</a></li>\n                                <li><a href=\"#\">Another action</a></li>\n                                <li><a href=\"#\">Something else here</a></li>\n                                <li class=\"divider\"></li>\n                                <li><a href=\"#\">Separated link</a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"panel-body text-center\">\n                    <i class=\"icon-list widget-icon\"></i>  <h1 class=\"right panel-middle margin-b-0\">6,782</h1>\n                </div>\n            </div><!-- End .panel --> \n\n\n\n        </div>\n\n        <div class=\"col-md-6 col-lg-3\">\n            <div class=\"panel panel-card recent-activites\">\n                <!-- Start .panel -->\n                <div class=\"panel-heading\">\n                    HEADING\n                    <div class=\"pull-right\">\n                        <div class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                            <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                                <li><a href=\"#\">Action</a></li>\n                                <li><a href=\"#\">Another action</a></li>\n                                <li><a href=\"#\">Something else here</a></li>\n                                <li class=\"divider\"></li>\n                                <li><a href=\"#\">Separated link</a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"panel-body text-center\">\n                    <i class=\"icon-like widget-icon\"></i>  <h1 class=\"right panel-middle margin-b-0\">1,782</h1>\n                </div>\n            </div><!-- End .panel --> \n\n\n\n        </div>\n\n\n    </div>\n\n<div class=\"row\">\n    <div class=\"col-md-6 col-lg-3\">\n        <div class=\"card cyan white-text clearfix\">\n\n            <div class=\"card-content clearfix\">\n                <i class=\"icon-settings background-icon\"></i>\n                <p class=\"card-stats-title right panel-title wdt-lable\">HEADING</p>\n                <h4 class=\"right panel-middle margin-b-0 wdt-lable\">$4762</h4>\n\n                <div class=\"clearfix\"></div>\n            </div>\n\n        </div>\n    </div>\n\n    <div class=\"col-md-6 col-lg-3\">\n        <div class=\"card orange white-text clearfix\">\n\n            <div class=\"card-content clearfix\">\n                <i class=\"icon-user background-icon\"></i>\n                <p class=\"card-stats-title right panel-title wdt-lable\">HEADING</p>\n                <h4 class=\"right panel-middle margin-b-0 wdt-lable\">6,782</h4>\n\n                <div class=\"clearfix\"></div>\n            </div>\n\n        </div>\n    </div>\n\n    <div class=\"col-md-6 col-lg-3\">\n        <div class=\"card teal white-text clearfix\">\n\n            <div class=\"card-content clearfix\">\n                <i class=\"icon-basket background-icon\"></i>\n                <p class=\"card-stats-title right panel-title wdt-lable\">HEADING</p>\n                <h4 class=\"right panel-middle margin-b-0 wdt-lable\">1,782</h4>\n\n                <div class=\"clearfix\"></div>\n            </div>\n\n        </div>\n    </div>\n\n    <div class=\"col-md-6 col-lg-3\">\n        <div class=\"card green white-text clearfix\">\n\n            <div class=\"card-content clearfix\">\n                <i class=\"icon-graph background-icon\"></i>\n                <p class=\"card-stats-title right panel-title wdt-lable\">HEADING</p>\n                <h4 class=\"right panel-middle margin-b-0 wdt-lable\">1,782</h4>\n\n                <div class=\"clearfix\"></div>\n            </div>\n\n        </div>\n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"panel panel-card recent-activites\">\n            <!-- Start .panel -->\n            <div class=\"panel-heading\"> <div class=\"pull-right\">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                        <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                        </ul>\n                    </div>\n                </div>\n                HEADING<!--<p>This is Morris bar chart description.</p>-->\n\n            </div>\n            <div class=\"panel-body text-center\">\n                <div id=\"morris-bar\" class=\"h370\"></div>\n            </div>\n        </div><!-- End .panel --> \n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"panel panel-card recent-activites\">\n            <!-- Start .panel -->\n            <div class=\"panel-heading\">\n                <div class=\"pull-right\">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                        <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                        </ul>\n                    </div>\n                </div> HEADING\n                <!--<p>This is Morris bar chart description.</p>-->\n\n            </div>\n            <div class=\"panel-body text-center\">\n                <div id=\"morris-area-chart\" class=\"h370\"></div>\n            </div>\n        </div><!-- End .panel --> \n    </div>\n\n</div>\n\n\n<div class=\"row\">\n    <div class=\"col-md-6\">\n        <div class=\"panel panel-card recent-activites\">\n            <!-- Start .panel -->\n            <div class=\"panel-heading\">\n                HEADING\n                <div class=\"pull-right\">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                        <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"panel-body text-center\">\n                <div id=\"morris-area-chart2\" class=\"h370\"></div>\n            </div>\n        </div><!-- End .panel --> \n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"panel panel-card recent-activites\">\n            <!-- Start .panel -->\n            <div class=\"panel-heading\">\n                HEADING\n                <div class=\"pull-right\">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                        <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"panel-body text-center\">\n                <div id=\"myfirstchart\" class=\"h370\"></div>\n            </div>\n        </div><!-- End .panel --> \n    </div>\n\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-6\">\n        <div class=\"panel panel-card recent-activites\">\n            <!-- Start .panel -->\n            <div class=\"panel-heading\">\n                HEADING\n                <div class=\"pull-right\">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                        <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"panel-body text-center\">\n                <div id=\"stacked\" class=\"h370\"></div>\n            </div>\n        </div><!-- End .panel --> \n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"panel panel-card recent-activites\">\n            <!-- Start .panel -->\n            <div class=\"panel-heading\">\n               HEADING\n                <div class=\"pull-right\">\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn btn-info btn-rounded btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">Action <span class=\"caret\"></span></button>\n                        <ul class=\"dropdown-menu panel-dropdown\" role=\"menu\">\n                            <li><a href=\"#\">Action</a></li>\n                            <li><a href=\"#\">Another action</a></li>\n                            <li><a href=\"#\">Something else here</a></li>\n                            <li class=\"divider\"></li>\n                            <li><a href=\"#\">Separated link</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"panel-body text-center\">\n                <div id=\"extra-area-chart\" class=\"h370\"></div>\n            </div>\n        </div><!-- End .panel --> \n    </div>\n\n</div>"

/***/ }),
/* 275 */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),
/* 276 */
/***/ (function(module, exports) {

module.exports = "<!-- wrapper -->\n<div id=\"wrapper\">\n  <!-- BEGIN HEADER -->\n  <div class=\"page-header navbar navbar-fixed-top\">\n    <div class=\"page-header-inner \">\n      <div class=\"page-logo\">\n        <a href=\"index.html\">\n                    <img [src]=\"logoUrl\" alt=\"absolute admin\" class=\"img-responsive logo-default\"/>\n                </a>\n      </div>\n      <div class=\"menu-toggler sidebar-toggler\">\n        <a href=\"javascript:;\" class=\"navbar-minimalize minimalize-styl-2  pull-left \"><i class=\"fa fa-bars\"></i></a>\n      </div>\n      <div class=\"top-menu\">\n        <ul class=\"nav navbar-nav pull-right\">\n          <!-- <li class=\"dropdown dropdown-extended dropdown-notification\" id=\"header_notification_bar\">\n            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\">\n                <i class=\"icon-bell\"></i>\n                <span class=\"badge badge-default\"> <span class=\"ring\">\n                    </span><span class=\"ring-point\">\n                    </span> </span>\n            </a>\n          </li>\n          <li class=\"dropdown dropdown-extended dropdown-notification\" id=\"header_inbox_bar\">\n            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\">\n                <i class=\"icon-envelope-open\"></i>\n                <span class=\"badge badge-default\"> <span class=\"ring\">\n                    </span><span class=\"ring-point\">\n                    </span> </span>\n            </a>\n          </li>\n          <li class=\"dropdown dropdown-extended dropdown-tasks\" id=\"header_task_bar\">\n            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\">\n                <i class=\"icon-calendar\"></i>\n                <span class=\"badge badge-default\"> <span class=\"ring\">\n                    </span><span class=\"ring-point\">\n                    </span> </span>\n            </a>\n            <ul class=\"dropdown-menu extended tasks animated flipInX\">\n              <li class=\"external\">\n                <h3>You have\n                  <span class=\"bold\">12 pending</span> tasks</h3>\n                <a href=\"app_todo.html\">view all</a>\n              </li>\n            </ul>\n          </li> -->\n          <li class=\"dropdown dropdown-user\">\n            <a href=\"javascript:;\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" data-hover=\"dropdown\" data-close-others=\"true\" aria-expanded=\"false\">\n                <img alt=\"\" class=\"img-circle\" [src]=\"photoUrl\" >\n\n            </a>\n            <ul class=\"dropdown-menu dropdown-menu-default\">\n              <li>\n                <a [routerLink]=\"['/profile']\">\n                    <i class=\"icon-user\"></i> My Profile</a>\n              </li>\n              <li *ngIf=\"currentUser.accounttype ==='super'\">\n                <a [routerLink]=\"['/support']\">\n                  <i class=\"icon-home\"></i> Support Office</a>\n              </li>\n              <li>\n                <a [routerLink]=\"['/login']\" (click)=\"logout()\">\n                    <i class=\"icon-key\"></i> Log Out </a>\n              </li>\n            </ul>\n          </li>\n        </ul>\n      </div>\n\n    </div>\n  </div>\n"

/***/ }),
/* 277 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"account-col text-center\">\n        <div class=\"logo\">\n            <img src=\"assets/images/login.png\" alt=\"\" class=\"login_logo img-responsive\">\n        </div>\n        <h3>Log into your account</h3>\n        <form class=\"m-t\" (submit)=\"onLoginSubmit()\" role=\"form\" action=\"index.html\">\n            <div class=\"form-group\">\n                <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username or Email\" required=\"\">\n            </div>\n            <div class=\"form-group\">\n                <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" required=\"\">\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary btn-block \"><i *ngIf=\"loading\" class=\"fa fa-spinner fa-spin\" style=\"margin-right: 20px;\"></i>Login</button>\n            <label style=\"padding-right: 20px;\"> <input type=\"checkbox\"  [checked]=\"remember_me\" (change)=\"remember_me = !remember_me\"><i></i> Remember me </label>\n            <a [routerLink]=\"['/forgotpassword']\"><small>Forgot password?</small></a>\n            <p>Carpet Court &copy; 2017</p>\n        </form>\n        <div *ngIf=\"error\" class=\"alert alert-danger  alert-dismissable\">\n            <a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>\n            <strong>Sorry, your login was unsuccessful, please try again.</strong>\n        </div>\n    </div>\n</div>\n"

/***/ }),
/* 278 */
/***/ (function(module, exports) {

module.exports = "<p>\n  main works!\n</p>\n"

/***/ }),
/* 279 */
/***/ (function(module, exports) {

module.exports = "<!--For Super User-->\n<aside class=\"sidebar\" *ngIf=\"user.accounttype  === 'super'\">\n    <nav class=\"sidebar-nav\">\n        <ul class=\"metismenu\" id=\"menu\">\n            <li class=\"active\">\n                <a routerLink=\"/dashboard\"><i class=\"icon-grid\"></i> <span class=\"nav-label\">Dashboard</span></a>\n            </li>\n            <li>\n                <a [routerLink]=\"['/users']\"><i class=\"fa fa-users\"></i> <span class=\"nav-label\">Users</span></a>\n            </li>\n            <li>\n                <a [routerLink]=\"['/roles']\"><i class=\"fa fa-edit\"></i> <span class=\"nav-label\">User Roles</span></a>\n            </li>\n            <li>\n                <a [routerLink]=\"['/stores']\"><i class=\"fa fa-building\"></i> <span class=\"nav-label\">Stores</span></a>\n            </li>\n            <li>\n                <a [routerLink]=\"['/companies']\"><i class=\"fa fa-bank\"></i> <span class=\"nav-label\">Companies</span></a>\n            </li>\n            <li>\n                <a [routerLink]=\"['/orders']\"><i class=\"fa fa-shopping-bag\"></i> <span class=\"nav-label\">Orders/Invoices</span></a>\n            </li>\n            <li style=\"cursor: pointer;\">\n                <a [routerLink]=\"[activatedRoute]\"><i class=\"fa fa-cogs\"></i> <span class=\"nav-label\">Form Settings</span><span class=\"fa arrow\"></span></a>\n                <ul class=\"nav nav-second-level collapse\">\n                    <li><a [routerLink]=\"['/uni-types']\">Unit Type</a></li>\n                    <li><a [routerLink]=\"['/col-schema']\">Colour Schemes</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n</aside>\n<!--For staff  and customer -->\n<aside class=\"sidebar\" *ngIf=\"user.accounttype  === 'staff'\">\n    <nav class=\"sidebar-nav\">\n        <ul class=\"metismenu\" id=\"menu\">\n            <li class=\"active\" *ngIf=\"display_dashboard\">\n                <a routerLink=\"/dashboard\"><i class=\"icon-grid\"></i> <span class=\"nav-label\">Dashboard</span></a>\n            </li>\n            <li *ngIf=\"customer_permission.create || customer_permission.delete || customer_permission.edit || customer_permission.view || staff_permission.create || staff_permission.edit || staff_permission.delete || staff_permission.view\">\n                <a [routerLink]=\"['/users']\"><i class=\"fa fa-users\"></i> <span class=\"nav-label\">Users</span></a>\n            </li>\n            <li *ngIf=\"role_permission.create || role_permission.edit || role_permission.delete || role_permission.view\">\n                <a [routerLink]=\"['/roles']\"><i class=\"fa fa-edit\"></i> <span class=\"nav-label\">User Roles</span></a>\n            </li>\n            <li *ngIf=\"store_permission.create || store_permission.edit || store_permission.delete || store_permission.view\">\n                <a [routerLink]=\"['/stores']\"><i class=\"fa fa-building\"></i> <span class=\"nav-label\">Stores</span></a>\n            </li>\n            <li *ngIf=\"company_permission.create || company_permission.edit || company_permission.delete || company_permission.view\">\n                <a [routerLink]=\"['/companies']\"><i class=\"fa fa-bank\"></i> <span class=\"nav-label\">Companies</span></a>\n            </li>\n            <li *ngIf=\"order_permission.create || order_permission.edit || order_permission.delete || order_permission.view\">\n                <a [routerLink]=\"['/orders']\"><i class=\"fa fa-shopping-bag\"></i> <span class=\"nav-label\">Orders/Invoices</span></a>\n            </li>\n        </ul>\n    </nav>\n</aside>\n<aside class=\"sidebar\" *ngIf=\"user.accounttype === 'customer' \">\n    <nav class=\"sidebar-nav\">\n        <ul class=\"metismenu\" id=\"menu\">\n            <li class=\"active\" *ngIf=\"display_dashboard\">\n                <a routerLink=\"/dashboard\"><i class=\"icon-grid\"></i> <span class=\"nav-label\">Dashboard</span></a>\n            </li>\n            <li *ngIf=\"customer_permission.create || customer_permission.delete || customer_permission.edit || customer_permission.view || staff_permission.create || staff_permission.edit || staff_permission.delete || staff_permission.view\">\n                <a [routerLink]=\"['/users']\"><i class=\"fa fa-users\"></i> <span class=\"nav-label\">Users</span></a>\n            </li>\n            <li *ngIf=\"role_permission.create || role_permission.edit || role_permission.delete || role_permission.view\">\n                <a [routerLink]=\"['/roles']\"><i class=\"fa fa-edit\"></i> <span class=\"nav-label\">User Roles</span></a>\n            </li>\n            <li *ngIf=\"store_permission.create || store_permission.edit || store_permission.delete || store_permission.view\">\n                <a [routerLink]=\"['/stores']\"><i class=\"fa fa-building\"></i> <span class=\"nav-label\">Stores</span></a>\n            </li>\n            <li *ngIf=\"company_permission.create || company_permission.edit || company_permission.delete || company_permission.view\">\n                <a [routerLink]=\"['/companies']\"><i class=\"fa fa-bank\"></i> <span class=\"nav-label\">Companies</span></a>\n            </li>\n            <li *ngIf=\"order_permission.create || order_permission.edit || order_permission.delete || order_permission.view\">\n                <a [routerLink]=\"['/orders']\"><i class=\"fa fa-shopping-bag\"></i> <span class=\"nav-label\">Orders/Invoices</span></a>\n            </li>\n        </ul>\n    </nav>\n</aside>"

/***/ }),
/* 280 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Flooring Order Request</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Flooring Order Request</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n<form name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"sendEmail()\" novalidate>\n<div class=\"row\">\n  <ngx-loading [show]=\"loading\"></ngx-loading>\n  <div class=\"panel panel-card recent-activites\">\n    <div class=\"col-sm-8 col-sm-offset-2\">\n      <h4>Client Information</h4>\n    </div>\n    <div class=\"col-md-8 col-md-offset-2\">\n      <div class=\"panel-body\">\n        <div class=\"\">\n          <table id=\"basic-datatables\" class=\"table table-bordered\">\n            <tr>\n              <td class=\"title td-title\">Account Name</td>\n              <td class=\"title\">\n                <div class=\"form-group\">\n                  <input type=\"text\" name=\"name\" class=\"order-input\">\n                </div>\n              </td>\n            </tr>\n            <tr>\n              <td class=\"title td-title\">Summerset Village</td>\n              <td class=\"title\">\n                <div class=\"form-group\" *ngIf=\"companies.length === 1\">\n                  {{companies[0].name}}\n                </div>\n                <div class=\"form-group\">\n                  <select name=\"companies\" class=\"form-control\" (change)=\"selectCompany($event)\" *ngIf=\"companies.length > 1\">\n                    <option value=\"\" selected></option>\n                    <option *ngFor=\"let item of companies\" value=\"{{item._id}}\">{{item.name}}</option>\n                  </select>\n                </div>\n              </td>\n            </tr>\n            <tr>\n              <td class=\"title td-title\">Name</td>\n              <td class=\"title\">\n                <input type=\"text\" name=\"inputmob\" class=\"order-input\" [(ngModel)]=\"user.username\" #name=\"ngModel\">\n              </td>\n            </tr>\n            <tr>\n              <td class=\"title td-title\">Email</td>\n              <td class=\"title\">\n                <input type=\"text\" name=\"email\" class=\"order-input\" [(ngModel)]=\"user.email\" #email=\"ngModel\">\n              </td>\n            </tr>\n            <tr>\n              <td class=\"title td-title\">Phone</td>\n              <td class=\"title\">\n                <div class=\"col-md-6\">\n                  <label for=\"inputwk\">Wk:</label>\n                  <input type=\"text\" name=\"inputwk\" style=\"border: none;margin: 0;\" [(ngModel)]=\"user.user_info.phone\" *ngIf=\"user.accounttype === 'staff' || user.accounttype === 'customer'\">\n                </div>\n                <div class=\"col-md-6\">\n                  <label for=\"inputmob\">Mob:</label>\n                  <input type=\"text\" name=\"inputmob\" style=\"border: none;margin: 0;\" [(ngModel)]=\"user.user_info.mobile\" *ngIf=\"user.accounttype === 'staff' || user.accounttype === 'customer'\">\n                </div>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-8 col-sm-offset-2\">\n    <h4>Flooring Contractor Information</h4>\n  </div>\n  <div class=\"col-md-8 col-md-offset-2\">\n    <div class=\"panel-body\">\n      <div class=\"\">\n        <table id=\"basic-datatables\" class=\"table table-bordered\">\n          <tr>\n            <td class=\"title td-title\">Store</td>\n            <td class=\"title\">\n              <ng-container *ngIf=\"assigned_stores.length > 1\">\n                <div class=\"form-group\">\n                  <select name=\"stores\" id=\"input-status\" class=\"form-control\" (change)=\"selectStore($event)\">\n                    <option value=\"\" selected></option>\n                    <option *ngFor=\"let item of assigned_stores\" value=\"{{item._id}}\">{{item.store_title}}</option>\n                  </select>\n                </div>\n              </ng-container>\n              <ng-container *ngIf=\"assigned_stores.length == 1\">\n                {{assigned_stores[0].store_title}}\n              </ng-container>\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Address</td>\n            <td class=\"title\">\n              <div class=\"col-md-6\" *ngIf=\"store_address.address1&&store_address.address2&&store_info.region&&store_info.city\">\n                {{store_address.address1}} {{store_address.address2}} {{','}} {{store_info.city}} {{','}} {{store_info.region}}\n              </div>\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Contact Name</td>\n            <td class=\"title\">\n              <input type=\"text\" name=\"inputmob\" [(ngModel)]=\"key_staff.username\" class=\"order-input\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Email</td>\n            <td class=\"title\">\n              <input type=\"text\" name=\"inputmob\" [(ngModel)]=\"staff_info.email\" class=\"order-input\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Phone</td>\n            <td class=\"title\">\n              <div class=\"col-md-6\">\n                <label for=\"inputwk\">Wk:</label>\n                <input type=\"text\" name=\"inputwk\" style=\"border: none;margin: 0;\" [(ngModel)]=\"staff_info.phone\">\n              </div>\n              <div class=\"col-md-6\">\n                <label for=\"inputmob\">Mob:</label>\n                <input type=\"text\" name=\"inputmob\" style=\"border: none;margin: 0;\" [(ngModel)]=\"staff_info.mobile\">\n              </div>\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-8 col-sm-offset-2\">\n    <h4>Project Details</h4>\n  </div>\n  <div class=\"col-md-8 col-md-offset-2\">\n    <div class=\"panel-body\">\n      <div class=\"\">\n        <table id=\"basic-datatables\" class=\"table table-bordered\">\n          <tr>\n            <td class=\"title td-title\">Order Number</td>\n            <td class=\"title\">\n              <input type=\"text\" name=\"inputmob\" class=\"order-input\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Order Date</td>\n            <td class=\"title\">\n              <input type=\"date\" name=\"inputmob\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Prefered Install Date</td>\n            <td class=\"title\">\n              <input type=\"date\" name=\"inputmob\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Quote Required</td>\n            <td class=\"title\">\n              <label for=\"inputmobyes\" style=\"padding-right: 30px;\">\n                <input type=\"radio\" id=\"inputmobyes\" name=\"inputmob\">YES</label>\n              <label for=\"inputmobno\">\n                <input type=\"radio\" name=\"inputmob\" id=\"inputmobno\">NO</label>\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Unit Type</td>\n            <td class=\"title\">\n              <input type=\"text\" name=\"unitType\" class=\"order-input\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Plan Type</td>\n            <td class=\"title\">\n              <input type=\"text\" name=\"inputmob\" class=\"order-input\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Unit Number</td>\n            <td class=\"title\">\n              <input type=\"text\" name=\"inputmob\" class=\"order-input\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Colour Scheme</td>\n            <input type=\"text\" name=\"colScheme\" class=\"order-input\">\n            <td class=\"title\">\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Areas Required</td>\n            <td class=\"title\" style=\"width:100%;\">\n              <table style=\"width:100%;\">\n                <tr style=\"width:100%;\">\n                  <td class=\"title\">\n                    <input type=\"checkbox\" [checked]=\" areas_required.carpet && areas_required.kitchen &&\n                    areas_required.bathroom && areas_required.laundry\" name=\"create_store\" value=\"entire\" (change)=\"selectArea($event)\">\n                    <label for=\"\">Entire Unit</label>\n                  </td>\n                  <td class=\"title\">\n                    <input type=\"checkbox\" value=\"carpet\" name=\"carpet\" [checked]=\"areas_required.carpet\" (change)=\"selectArea($event)\">\n                    <label for=\"\">Carpet</label>\n                  </td>\n                  <td class=\"title\">\n                    <input type=\"checkbox\" value=\"kitchen\" name=\"kitchen\" [checked]=\"areas_required.kitchen\" (change)=\"selectArea($event)\">\n                    <label for=\"\">Kitchen/Entry</label>\n                  </td>\n                </tr>\n                <tr style=\"width:100%;\">\n                  <td class=\"title\">\n                    <input type=\"checkbox\" value=\"other\" name=\"other\" (change)=\"selectArea($event)\">\n                    <label for=\"\">Other</label>\n                  </td>\n                  <td class=\"title\">\n                    <input type=\"checkbox\" value=\"bathroom\" name=\"bathroom\" [checked]=\"areas_required.bathroom\" (change)=\"selectArea($event)\">\n                    <label for=\"\">Bathroom</label>\n                  </td>\n                  <td class=\"title\">\n                    <input type=\"checkbox\" value=\"laundry\" name=\"laundry\" [checked]=\"areas_required.laundry\" (change)=\"selectArea($event)\">\n                    <label for=\"\">Laundry</label>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title td-title\">Special Instructions</td>\n            <td class=\"title\">\n              <textarea [required]=\"visible_special\" name=\"inputmob\" class=\"order-input\"></textarea>\n            </td>\n          </tr>\n          <tr>\n            <td class=\"title\"></td>\n            <td class=\"title\">\n              <button type=\"submit\" id=\"button-filter\" class=\"btn btn-primary pull-right\" (click)=\"sendEmail()\"><i class=\"fa fa-delete\"></i> Create Order</button>\n            </td>\n          </tr>\n        </table>\n      </div>\n    </div>\n  </div>\n</div>\n</form>\n<!-- <br>\n<div class=\"row\">\n    <div class=\"col-md-8 col-md-offset-2\">\n        <div class=\"panel-body\">\n            <table  class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n        <thead>\n            <tr>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                Carpet\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Vinyl/Vinyl Tile</th>\n              <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Bathroom Floor</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Bathroom Wall</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"5\">Laundry</th>\n            </tr>\n        </thead>\n    </table>\n        </div>\n    </div>\n</div>\n\n\n -->\n"

/***/ }),
/* 281 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Orders/Invoices Management</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Orders/Invoices Management</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"form-group\">\n      <ng-container *ngIf=\"user.accounttype === 'super'\">\n        <button class=\"btn btn-primary\" (click)=\"createOrder()\"><i class=\"fa fa-bank\"></i>Create Order</button>\n      </ng-container>\n      <ng-container *ngIf=\"user.accounttype=='staff'||user.accounttype=='customer'\">\n        <button *ngIf=\"order_permission.create\" (click)=\"createOrder()\" class=\"btn btn-primary\"><i class=\"fa fa-bank\"></i>Create Order</button>\n      </ng-container>\n    </div>\n    <div class=\"well\">\n      <div class=\"row\">\n        <div class=\"col-sm-2\">\n          <div class=\"form-group\">\n            <label class=\"control-label\">Filter By</label>\n          </div>\n        </div>\n        <div class=\"col-sm-2\">\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"input-status\">Type</label>\n            <select name=\"filter_type\" id=\"input-status\" class=\"form-control\" (change)=\"filter($event)\" [(ngModel)]=\"fType\">\n              <option value=\"All\">All</option>\n              <option value=\"Order\">Order</option>\n              <option value=\"Invoice\">Invoice</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col-sm-2\">\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"input-status\">Store</label>\n            <select name=\"filter_store\" id=\"filter_store\" class=\"form-control\" (change)=\"filter($event)\" [(ngModel)]=\"fStore\">\n              <option value=\"All\" selected>All</option>\n              <option *ngFor=\"let s of stores\" value=\"{{s.store_title}}\">{{s.store_title}}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"col-sm-2\">\n          <div class=\"form-group\">\n            <label class=\"control-label\" for=\"input-status\">Company / Village</label>\n            <select name=\"filter_village\" id=\"filter_village\" class=\"form-control\" (change)=\"filter($event)\" [(ngModel)]=\"fVillage\">\n              <option value=\"All\" selected>All</option>\n              <option *ngFor=\"let c of companies\" value=\"{{c.name}}\">{{c.name}}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n    </div>\n    <form method=\"post\" enctype=\"multipart/form-data\" id=\"form-product\" class=\"\">\n      <div class=\"table-responsive\">\n        <ngx-loading [show]=\"loading\"></ngx-loading>\n        <div style=\"display: inline-block;\">\n            <h4>Invoices</h4>\n        <label for=\"\" class=\"pull-right\">Last Updated: 2017-09-09 </label>\n        </div>\n        <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n          <thead>\n            <tr>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">#</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Type\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Invoice #\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Invoiced Date\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Store\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Village\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Balance\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Amount to Pay\n              </th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let item of invoices\">\n              <ng-container *ngIf=\"item.visible\">\n                <td class=\"text-center\">\n                  <input type=\"checkbox\" value=\"{{item.invnum}}\" (change)=\"selectElement($event,item)\">\n                </td>\n                <td class=\"text-center\">Order</td>\n                <td class=\"text-center\" class=\"invnum\" data-toggle=\"modal\" data-target=\"#detailModal\" (click)=\"showDetails(item)\">{{ item.invnum }}</td>\n                <td class=\"text-center\">{{ item.invdate }}</td>\n                <td class=\"text-center\">{{ item.store }}</td>\n                <td class=\"text-center\">{{ item.village }}</td>\n                <td class=\"text-center\">{{ item.balance }}</td>\n                <td class=\"text-center\">\n                  <ng-container *ngIf=\"item.checked\">\n                    <input type=\"text\" name=\"{{item.invnum}}\" [(ngModel)]=\"item.amounttopay\" (change)=\"calculateSum()\">\n                  </ng-container>\n                </td>\n              </ng-container>\n            </tr>\n            <tr>\n              <td class=\"text-center\">{{tickCount}}</td>\n              <td class=\"text-center\"></td>\n              <td class=\"text-center\">{{invoiceCount}}</td>\n              <td class=\"text-center\"></td>\n              <td class=\"text-center\"></td>\n              <td class=\"text-center\"></td>\n              <td class=\"text-center\">{{sumBalance}}</td>\n              <td class=\"text-center\">{{sumAmount}}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <div class=\"modal fade\" id=\"detailModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n        <div class=\"modal-dialog\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header text-center\">\n              <h4 class=\"modal-title\">Order Details</h4>\n            </div>\n            <div class=\"modal-body\">\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>InvNum:</strong> </div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.invnum}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>InvDate</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.invdate}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Store</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.store}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Village</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.village}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Code</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.code}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Period</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.period}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>MonthsOld</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.monthsold}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Value</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>${{selectedItem.value}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>GST</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>${{selectedItem.gst}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>PONum</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.ponum}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>CommonName</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>{{selectedItem.commonname}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Balance</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>${{selectedItem.balance}}</span></div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><strong>InvoiceTotal</strong></div>\n                <div class=\"col-sm-4 col-xs-4\"><span>${{selectedItem.invoicetotal}}</span></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </form>\n    <br>\n    <div class=\"form-group\" *ngIf=\"user.accounttype === 'super' \">\n      <button type=\"button\" id=\"button-delete\" class=\"btn btn-primary\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n      <button type=\"button\" id=\"button-send\" class=\"btn btn-primary pull-right\" (click)=\"sendEmail()\"><i class=\"fa fa-delete\"></i> Send remittance advice</button>\n    </div>\n    <div class=\"form-group\" *ngIf=\"user.accounttype === 'staff' || user.accounttype === 'customer' \">\n      <button *ngIf=\"order_permission.delete\" type=\"button\" id=\"button-delete\" class=\"btn btn-primary\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n      <button *ngIf=\"order_permission.create || order_permission.edit || order_permission.delete || order_permission.view\" type=\"button\" id=\"button-send\" class=\"btn btn-primary pull-right\"><i class=\"fa fa-delete\"></i> Send remittance advice</button>\n    </div>\n    <br>\n    <div class=\"row\">\n      <div class=\"col-sm-4 col-sm-offset-1\">\n        <label class=\"control-label\" for=\"summaries-filter\">Company / Village</label>\n        <select name=\"summaries-filter\" id=\"summaries-filter\" class=\"form-control\" (change)=\"filterSummaries($event)\" [(ngModel)]=\"sVillage\">\n          <option value=\"All\" selected>All</option>\n          <option *ngFor=\"let c of companies\" value=\"{{c.name}}\">{{c.name}}</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"table-responsive\">\n      <h4>Summary</h4>\n      <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n        <thead>\n          <tr>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">#</th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Village\n            </th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Code\n            </th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Older\n            </th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">3 Months\n            </th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">2 Months\n            </th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">1 Month\n            </th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Current\n            </th>\n            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Total\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let sum of oSummaries\">\n            <ng-container *ngIf=\"sum.visible\">\n              <td class=\"text-center\">\n                <input type=\"checkbox\" value=\"\">\n              </td>\n              <td class=\"text-center\">{{sum.village}}</td>\n              <td class=\"text-center\">{{sum.code}}</td>\n              <td class=\"text-center\">{{sum.older? sum.older: 0}}</td>\n              <td class=\"text-center\">{{sum.three? sum.three: 0}}</td>\n              <td class=\"text-center\">{{sum.two? sum.two: 0}}</td>\n              <td class=\"text-center\">{{sum.one? sum.one: 0}}</td>\n              <td class=\"text-center\">{{sum.current? sum.current: 0}}</td>\n              <td class=\"text-center\">{{(sum.older?sum.older:0)+(sum.three?sum.three:0)+(sum.two?sum.two:0)+(sum.one?sum.one:0)+(sum.current?sum.current:0)}}</td>\n            </ng-container>\n          </tr>\n          <tr>\n            <td class=\"text-center\">\n            </td>\n            <td class=\"text-center\">Total</td>\n            <td class=\"text-center\"></td>\n            <td class=\"text-center\">{{summariesTotal.older}}</td>\n            <td class=\"text-center\">{{summariesTotal.three}}</td>\n            <td class=\"text-center\">{{summariesTotal.two}}</td>\n            <td class=\"text-center\">{{summariesTotal.one}}</td>\n            <td class=\"text-center\">{{summariesTotal.current}}</td>\n            <td class=\"text-center\">{{summariesTotal.sumtotal}}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <br>\n  </div>\n</div>\n"

/***/ }),
/* 282 */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"error-box\">\n        <h1>404</h1>\n        <h4>It looks like you have taken a wrong turn</h4>\n        <p>\n            The page you are looking for is not found, please try after some time or go back to home\n        </p>\n        <span class=\"go_back\" (click)=\"back()\">Go back to previous page</span>\n    </div>\n</div>"

/***/ }),
/* 283 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Your Profile</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Your Profile</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n    <form class=\"form-horizontal group-border stripped\" name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n        <div class=\"col-md-6 margin-b-30\">\n            <div class=\"profile-overview\">\n                <div class=\"profile-edit\">\n                    <h4 class=\"mb-xlg\">Personal Information</h4>\n                    <fieldset>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : username.invalid && username.touched }\">\n                            <label class=\"col-md-4 control-label\" for=\"profileName\">Name</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" name=\"username\" id=\"profileName\" placeholder=\"Enter Your UserName\" minlength=\"4\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"customer.username\" #username=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : email.invalid && email.touched }\">\n                            <label class=\"col-md-4 control-label\" for=\"profileEmail\">Email</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profileEmail\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"customer.email\" #email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : phone.invalid && phone.touched }\">\n                            <label class=\"col-md-4 control-label\" for=\"profilePhone\">Phone</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profilePhone\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.phone\" #phone=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : mobile.invalid && mobile.touched }\">\n                            <label class=\"col-md-4 control-label\" for=\"profileMobile\">Mobile</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profileMobile\" name=\"mobile\" placeholder=\"Mobile number\" class=\"form-control\" [(ngModel)]=\"user_info.mobile\" #mobile=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : position.invalid && position.touched }\">\n                            <label class=\"col-md-4 control-label\" for=\"profilePosition\">Position</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profilePosition\" placeholder=\"Enter Position\" class=\"form-control\" name=\"position\" [(ngModel)]=\"customer_info.position\" #position=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : prefered_contact.invalid && prefered_contact.touched }\">\n                            <label class=\"col-md-4 control-label\" for=\"profilePreferContactMethod\">Prefered Contact Method</label>\n                            <div class=\"col-md-8\">\n                                <select class=\"fancy-select form-control\" id=\"profilePreferContactMethod\" name=\"prefered_contact\" [(ngModel)]=\"customer_info.prefered_contact\" #prefered_contact=\"ngModel\">\n                    <option value=\"phone\">Phone</option>\n                    <option value=\"mobile\">Mobile</option>\n                    <option value=\"email\">Email</option>\n                </select>\n                            </div>\n                        </div>\n                    </fieldset>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"col-md-6 margin-b-30\">\n            <div class=\"profile-edit\">\n                <hr class=\"dotted tall\">\n                <fieldset>\n                    <div class=\"avtar text-center\">\n                        <img [src]=\"photoUrl\" alt=\"Preview\" class=\"img-thumbnail img-responsive\" style=\"width:30%; height: 30%;\">\n                        <hr>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-lg-2 col-md-4 control-label\">Photo</label>\n                        <div class=\"col-lg-3 col-md-4\">\n                            <input type=\"file\" (change)=\"readPhoto($event)\" placeholder=\"Upload logo...\" />\n                        </div>\n                    </div>\n                </fieldset>\n                <h4 class=\"mb-xlg\">Permission & Access</h4>\n                <fieldset>\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"profilePassword\">Password</label>\n                        <div class=\"col-md-8\">\n                            <input type=\"password\" id=\"profilePassword\" placeholder=\"\" class=\"form-control\" name=\"password\" [(ngModel)]=\"customer.password\" #password=\"ngModel\">\n                        </div>\n                        <div *ngIf=\"userForm.submitted && !password.valid\" class=\"help-block\">Pasword is </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-md-4 control-label\" for=\"profileRepeatPassword\">Confirm Password</label>\n                        <div class=\"col-md-8\">\n                            <input type=\"password\" id=\"profileRepeatPassword\" placeholder=\"\" class=\"form-control\" name=\"confirmpassword\" [(ngModel)]=\"customer.confirm_password\" #confirmpassword=\"ngModel\">\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div *ngIf=\"(customer.password !== customer.confirm_password) && (confirmpassword.dirty|| confirmpassword.touched )\" class=\"col-md-offset-3 col-md-8 alert alert-danger\">\n                            <div>The passwords entered do not match</div>\n                        </div>\n                    </div>\n\n                </fieldset>\n                <div class=\"panel-footer\">\n                    <div class=\"row\">\n                        <div class=\"col-md-9 col-md-offset-3\">\n                            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!userForm.form.valid\">Submit</button>\n                            <button type=\"button\" class=\"btn btn-info btn-primary\" (click)=\"cancel()\">Cancel</button>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </form>\n</div>"

/***/ }),
/* 284 */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"account_type === 'staff'\">\n\t<staff-profile></staff-profile>\n</ng-container>\n<ng-container *ngIf=\"account_type ==='customer'\">\n\t<customer-profile></customer-profile>\n</ng-container>\n<ng-container *ngIf=\"account_type === 'super'\">\n\t<super-profile></super-profile>\n</ng-container>"

/***/ }),
/* 285 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Your Profile</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Your Profile</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<!-- end .page title-->\n<div class=\"row\">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"panel panel-card margin-b-30\">\n      <div class=\"well\">\n        <div class=\"panel-body\">\n          <form class=\"form-horizontal group-border stripped\" name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n            <div class=\"form-group\" >\n              <label class=\"col-lg-2 col-md-3 control-label\">Name</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"text\" name=\"username\" placeholder=\"Enter Your UserName\" minlength=\"4\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"user.username\"\n                  #username=\"ngModel\"  required>\n              </div>\n            </div>\n            <div class=\"form-group\" >\n              <label class=\"col-lg-2 col-md-3 control-label\">Email</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"email\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"user.email\" #email=\"ngModel\"\n                  [email]=\"true\" required>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Phone</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"text\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.phone\" #phone=\"ngModel\"\n                  required>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Mobile</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"text\" name=\"mobile\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.mobile\" #mobile=\"ngModel\"\n                  required>\n              </div>\n            </div>\n            <div class=\"form-group\"  [ngClass]=\"{ 'has-error' : password.invalid && password.touched }\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Password</label>\n              <div class=\"col-lg-3 col-md-3\">\n                <input type=\"Password\" name=\"password\" placeholder=\"\" class=\"form-control\" [(ngModel)]=\"user.password\" #password=\"ngModel\">\n              </div>\n            </div>\n            <div class=\"form-group\"  [ngClass]=\"{ 'has-error' : confirmPassword.invalid && confirmPassword.touched }\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Confirm Password</label>\n              <div class=\"col-lg-3 col-md-3\">\n                <input type=\"Password\" name=\"confirmPassword\" placeholder=\"\" class=\"form-control\" [(ngModel)]=\"user.confirmPassword\" #confirmPassword=\"ngModel\">\n              </div>\n            </div>\n            <div class=\"col-md-5\">\n              <div class=\"form-group text-center\">\n                <button type=\"button\" class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n                    Cancel\n                </button>\n              <button type=\"submit\" class=\"btn btn-info  btn-primary\"  [disabled]=\"!userForm.form.valid\">\n                Save\n              </button>\n\n              </div>\n            </div>\n\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 286 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Super User</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Super User</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<!-- end .page title-->\n<div class=\"row\">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"panel panel-card margin-b-30\">\n      <div class=\"well\">\n        <div class=\"panel-body\">\n          <form class=\"form-horizontal group-border stripped\" name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n            <div class=\"form-group\" >\n              <label class=\"col-lg-2 col-md-3 control-label\">Name</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"text\" name=\"username\" placeholder=\"Enter Your UserName\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"super.username\"\n                  #username=\"ngModel\"  required>\n              </div>\n            </div>\n            <div class=\"form-group\" >\n              <label class=\"col-lg-2 col-md-3 control-label\">Email</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"email\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"user_info.email\" #email=\"ngModel\"\n                  [email]=\"true\" required>\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Phone</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"text\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.phone\" #phone=\"ngModel\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Mobile</label>\n              <div class=\"col-lg-5 col-md-5\">\n                <input type=\"text\" name=\"mobile\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.mobile\" #mobile=\"ngModel\">\n              </div>\n            </div>\n            <div class=\"form-group\"  [ngClass]=\"{ 'has-error' : password.invalid && password.touched }\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Password</label>\n              <div class=\"col-lg-3 col-md-3\">\n                <input type=\"Password\" name=\"password\" class=\"form-control\" [(ngModel)]=\"super.password\" #password=\"ngModel\">\n              </div>\n            </div>\n            <div class=\"form-group\"  [ngClass]=\"{ 'has-error' : confirmPassword.invalid && confirmPassword.touched }\">\n              <label class=\"col-lg-2 col-md-3 control-label\">Confirm Password</label>\n              <div class=\"col-lg-3 col-md-3\">\n                <input type=\"Password\" name=\"confirmPassword\" class=\"form-control\" [(ngModel)]=\"super.confirmPassword\" #confirmPassword=\"ngModel\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"row text-center\">\n                <button type=\"button\" class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n                    Cancel\n                </button>\n                <button type=\"submit\" class=\"btn btn-info  btn-primary\" [disabled]=\"!userForm.form.valid\">\n                Save\n              </button>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 287 */
/***/ (function(module, exports) {

module.exports = "\n"

/***/ }),
/* 288 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Create User Role</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Create User Role</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12 col-md-12\">\n        <div class=\"col-sm-5 col-md-5\">\n            <input type=\"text\" name=\"rolename\" placeholder=\"Enter Rolename\" minlength=\"3\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"newRole.role_name\" #rolename=\"ngModel\" required>\n        </div>\n        <ng-container *ngFor=\"let cr of currentRoles \">\n            <div class=\"col-sm-5 col-md-5\" *ngIf=\"cr.role_name === rolename\">\n                <div class=\"alert alert-danger\">{{error}}</div>\n            </div>\n        </ng-container>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"col-md-12 col-sm-12s\">\n            <div class=\"table-responsive\">\n                <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n\n                    <thead>\n                        <tr>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                Permitted Action\n                            </th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Create</th>\n                            <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Edit</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Deactivate</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"5\">View Only</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Staff Users\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_staff\" [checked]=\"staff.create\" (change)=\"staff.create = !staff.create\" /></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_staff\" [checked]=\"staff.edit\" (change)=\"staff.edit = !staff.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_staff\" [checked]=\"staff.delete\" (change)=\"staff.delete = !staff.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_staff\" [checked]=\"staff.view\" (change)=\"staff.view = !staff.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Customer Users\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_customer\" [checked]=\"customer.create\" (change)=\"customer.create = !customer.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_customer\" [checked]=\"customer.edit\" (change)=\"customer.edit = !customer.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_customer\" [checked]=\"customer.delete\" (change)=\"customer.delete = !customer.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_customer\" [checked]=\"customer.view\" (change)=\"customer.view = !customer.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Stores\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_store\" [checked]=\"store.create\" (change)=\"store.create = !store.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_store\" [checked]=\"store.edit\" (change)=\"store.edit = !store.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_store\" [checked]=\"store.delete\" (change)=\"store.delete = !store.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_store\" [checked]=\"store.view\" (change)=\"store.view = !store.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Orders\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_order\" [checked]=\"order.create\" (change)=\"order.create  = !order.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_order\" [checked]=\"order.edit\" (change)=\"order.edit = !order.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_order\" [checked]=\"order.delete\" (change)=\"order.delete = !order.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_order\" [checked]=\"order.view\" (change)=\"order.view = !order.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage User Roles\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_role\" [checked]=\"role.create\" (change)=\"role.create = !role.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_role\" [checked]=\"role.edit\" (change)=\"role.edit = !role.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_role\" [checked]=\"role.delete\" (change)=\"role.delete = !role.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_role\" [checked]=\"role.view\" (change)=\"role.view = !role.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Companies\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_company\" [checked]=\"company.create\" (change)=\"company.create = !company.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_company\" [checked]=\"company.edit\" (change)=\"company.edit = !company.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_company\" [checked]=\"company.delete\" (change)=\"company.delete = !company.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_company\" [checked]=\"company.view\" (change)=\"company.view = !company.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" value=\"create\" name=\"create_all\" (change)=\"selectAll($event)\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" value=\"edit\" name=\"edit_all\" (change)=\"selectAll($event)\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" value=\"delete\" name=\"delete_all\" (change)=\"selectAll($event)\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" value=\"view\" name=\"view_all\" (change)=\"selectAll($event)\"></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-md-3 col-sm-12\">\n        <select class=\"form-control m-b\" name=\"home_url\" [(ngModel)]=\"home_url\" required>\n      <option value=\"\" selected>Select the home screen for this role</option>\n      <option value=\"dashboard\">Dashboard</option>\n      <option value=\"users\">Users</option>\n      <option value=\"roles\">User Roles</option>\n      <option value=\"stores\">Stores</option>\n      <option value=\"orders\">Orders</option>\n      <option value=\"companies\">Companies</option>\n    </select>\n    </div>\n    <div class=\"col-md-3 col-sm-12\">\n        <label for=\"\">Display Dashboard</label>\n        <input type=\"checkbox\" name=\"display_dashboard\" [checked]=\"display_dashboard\" (change)=\"display_dashboard = !display_dashboard\">\n    </div>\n    <div class=\"col-md-6 col-sm-12s text-center\">\n        <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n      </button>\n        <button class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n      </button>\n    </div>\n</div>"

/***/ }),
/* 289 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">User Role Settings</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li> User Role Settings</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"col-lg-5 col-md-5\">\n            <input type=\"text\" name=\"rolename\" placeholder=\"Enter Rolename\" minlength=\"3\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"currentRole.role_name\" #rolename=\"ngModel\" required>\n        </div>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"col-md-12 col-sm-12\">\n            <div class=\"table-responsive\">\n                <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n\n                    <thead>\n                        <tr>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                Permitted Action\n                            </th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Create</th>\n                            <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Edit</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Deactivate</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"5\">View Only</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Staff Users\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_staff\" [checked]=\"staff.create\" (change)=\"staff.create = !staff.create\" /></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_staff\" [checked]=\"staff.edit\" (change)=\"staff.edit = !staff.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_staff\" [checked]=\"staff.delete\" (change)=\"staff.delete = !staff.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_staff\" [checked]=\"staff.view\" (change)=\"staff.view = !staff.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Customer Users\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_customer\" [checked]=\"customer.create\" (change)=\"customer.create = !customer.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_customer\" [checked]=\"customer.edit\" (change)=\"customer.edit = !customer.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_customer\" [checked]=\"customer.delete\" (change)=\"customer.delete = !customer.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_customer\" [checked]=\"customer.view\" (change)=\"customer.view = !customer.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Stores\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_store\" [checked]=\"store.create\" (change)=\"store.create = !store.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_store\" [checked]=\"store.edit\" (change)=\"store.edit = !store.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_store\" [checked]=\"store.delete\" (change)=\"store.delete = !store.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_store\" [checked]=\"store.view\" (change)=\"store.view = !store.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Orders\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_order\" [checked]=\"order.create\" (change)=\"order.create  = !order.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_order\" [checked]=\"order.edit\" (change)=\"order.edit = !order.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_order\" [checked]=\"order.delete\" (change)=\"order.delete = !order.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_order\" [checked]=\"order.view\" (change)=\"order.view = !order.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage User Roles\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_role\" [checked]=\"role.create\" (change)=\"role.create = !role.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_role\" [checked]=\"role.edit\" (change)=\"role.edit = !role.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_role\" [checked]=\"role.delete\" (change)=\"role.delete = !role.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_role\" [checked]=\"role.view\" (change)=\"role.view = !role.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\">\n                                Manage Companies\n                            </td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_company\" [checked]=\"company.create\" (change)=\"company.create = !company.create\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_company\" [checked]=\"company.edit\" (change)=\"company.edit = !company.edit\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_company\" [checked]=\"company.delete\" (change)=\"company.delete = !company.delete\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_company\" [checked]=\"company.view\" (change)=\"company.view = !company.view\"></td>\n                        </tr>\n                        <tr>\n                            <td class=\"title\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"create_all\" value=\"create\" (change)=\"selectAll($event)\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"edit_all\" value=\"edit\" (change)=\"selectAll($event)\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"delete_all\" value=\"delete\" (change)=\"selectAll($event)\"></td>\n                            <td class=\"title\"><input type=\"checkbox\" name=\"view_all\" value=\"view\" (change)=\"selectAll($event)\"></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-md-3 col-sm-12\">\n        <select class=\"form-control m-b\" name=\"home_url\" [(ngModel)]=\"currentRole.home_url\" #home_url=\"ngModel\" required>\n        <option value=\"dashboard\">Dashboard</option>\n        <option value=\"users\">Users</option>\n        <option value=\"roles\">User Roles</option>\n        <option value=\"stores\">Stores</option>\n        <option value=\"orders\">Orders</option>\n    </select>\n    </div>\n    <div class=\"col-md-3 col-sm-12\">\n        <label for=\"\">Display Dashboard</label>\n        <input type=\"checkbox\" name=\"display_dashboard\" [checked]=\"display_dashboard\" (change)=\"display_dashboard = !display_dashboard\">\n    </div>\n    <div class=\"col-md-6 col-sm-12 text-center\">\n        <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n      </button>\n        <button class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n      </button>\n    </div>\n</div>"

/***/ }),
/* 290 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">User Role</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>User Role</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <ngx-loading [show]=\"loading\"></ngx-loading>\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'super' \">\n            <a [routerLink]=\"['/createrole']\" class=\"btn btn-primary\"><i class=\"fa fa-user\"></i> Create New Role</a>\n        </div>\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'staff' || user.accounttype === 'customer' \">\n            <a [routerLink]=\"['/createrole']\" class=\"btn btn-primary\" *ngIf=\" role_permission.create \"><i class=\"fa fa-user\"></i> Create New Role</a>\n        </div>\n        <div class=\"col-md-12 col-sm-12s\">\n            <div class=\"table-responsive\">\n                <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n                    <thead>\n                        <tr>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                #\n                            </th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Role Name</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Status</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let item of roles\">\n                            <td class=\"title\">\n                                <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n                            </td>\n                            <td class=\"title\">\n                                <ng-container *ngIf=\"user.accounttype === 'super'\">\n                                    <a [routerLink]=\"['/role', item._id]\">{{ item.role_name }}</a>\n                                </ng-container>\n                                <ng-container *ngIf=\"user.accounttype === 'staff' || user.accounttype === 'customer'\">\n                                    <a [routerLink]=\"['/role', item._id]\" *ngIf=\"role_permission.edit\">{{ item.role_name }}</a>\n                                    <span *ngIf=\"!role_permission.edit\">{{ item.role_name }}</span>\n                                </ng-container>\n                            </td>\n                            <td class=\"title\">\n                                <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <br>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-sm-12 col-md-12\">\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'super'\">\n            <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deleteRoles()\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n            <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deactivateRoles()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n            <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"reactivateRoles()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n        </div>\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'staff' || user.accounttype === 'customer' \">\n            <button type=\"button\" *ngIf=\"role_permission.delete\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deactivateRoles()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n            <button *ngIf=\"role_permission.delete\" type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"reactivateRoles()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 291 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Colour Schemes + Areas</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Colour Schemes + Areas</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n\n<div class=\"row\">\n\t<div class=\"col-sm-12\">\n\t    <div class=\"form-group\">\n\t      <a [routerLink]=\"['/col-schema/create']\" class=\"btn btn-primary\"><i class=\"fa fa-user\"></i> Create New Colour Scheme</a>\n\t    </div>\n\n\t\t<div class=\"col-md-12 col-sm-12s\">\n\t  \t\t<div class=\"table-responsive\">\n\t    \t\t<table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n\t    \t\t\t<thead>\n\t\t\t            <tr>\n\t\t\t            \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n\t\t\t                \t#\n\t\t\t              \t</th>\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Name</th>\n\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Unit Type Assigned To</th>\n\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Status</th>\n\t\t\t            </tr>\n\t\t\t        </thead>\n\n\t\t\t        <tbody *ngFor=\"let item of colSchemas\">\n\t\t\t            <tr>\n\t\t\t              <td class=\"title\">\n\t\t\t                <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n\t\t\t              </td>\n\t\t\t              <td class=\"title\">\n\t\t\t                 <a [routerLink]=\"['/col-schema', item._id]\">{{ item.name }}</a>\n\t\t\t              </td>\n\n\t\t\t              <td class=\"title\">{{ item.unittypes_assigned }}</td>\n\n\t\t\t              <td class=\"title\">{{ item.status ? 'active' : 'inactive' }}</td>\n\t\t\t            </tr>\n\n\t\t\t        </tbody>\n\t\t\t    </table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"form-group\">\n      <button type=\"button\"  class=\"btn btn-primary \" (click)=\"deleteColSchemas()\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n      <button type=\"button\"  class=\"btn btn-primary \" (click)=\"deactivateColSchemas()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n      <button  type=\"button\"  class=\"btn btn-primary \" (click)=\"reactivateColSchemas()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 292 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Create New ColourScheme</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Create New ColourScheme</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <h5>Colour Scheme Name</h5>\n    <input type=\"text\" name=\"name\" placeholder=\"Enter Colour Schemes Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"colSchema.name\"\n    #name=\"ngModel\" required>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n      <div class=\"form-group\">\n        <button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#createAreaModal\"><i class=\"fa fa-user\"></i> Create New Area</button>\n        <div class=\"modal fade\" id=\"createAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n          <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header text-center\">\n                <h4 class=\"modal-title\">Create New Area</h4>\n              </div>\n              <div class=\"modal-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Name</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.name\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Supplier</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.supplier\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Code</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_code\" placeholder=\"Enter Area Code\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.code\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Product</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_product\" placeholder=\"Enter Area Product\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.product\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Colour</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_colour\" placeholder=\"Enter Area Colour\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.colour\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Install Details</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_install\" placeholder=\"Enter Area Install Details\" minlength=\"3\" class=\"form-control\" [(ngModel)]=\"newArea.install\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Price</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_price\" placeholder=\"Enter Area Price\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.price\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><button class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"createArea()\">Save</button></div>\n                <div class=\"col-sm-4 col-xs-4\"><button class=\"btn btn-default\" data-dismiss=\"modal\" >Cancel</button></div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"modal fade\" id=\"editAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n          <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header text-center\">\n                <h4 class=\"modal-title\">Create New Area</h4>\n              </div>\n              <div class=\"modal-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Name</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\"  [(ngModel)]=\"selectedArea.name\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Supplier</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.supplier\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Code</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_code\" placeholder=\"Enter Area Code\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.code\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Product</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_product\" placeholder=\"Enter Area Product\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.product\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Colour</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_colour\" placeholder=\"Enter Area Colour\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.colour\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Install Details</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_install\" placeholder=\"Enter Area Install Details\" minlength=\"3\" class=\"form-control\" [(ngModel)]=\"selectedArea.install\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Price</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_price\" placeholder=\"Enter Area Price\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.price\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><button class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveArea()\">Save</button></div>\n                <div class=\"col-sm-4 col-xs-4\"><button class=\"btn btn-default\" data-dismiss=\"modal\" >Cancel</button></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"table-responsive\">\n        <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n          <thead>\n            <tr>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                  #\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Name</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Supplier</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Code</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Product</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Colour</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Install</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Price</th>\n            </tr>\n          </thead>\n\n          <tbody *ngFor=\"let item of areas\">\n            <tr>\n              <td class=\"title\" >\n                <input type=\"checkbox\" name=\"select\" value=\"{{item.supplier}}\" (change)=\"selectArea($event)\" />\n              </td>\n              <td class=\"title\"  data-toggle=\"modal\"  data-target=\"#editAreaModal\" style=\"cursor: pointer; color: #23527c;\" (click)=\"editArea(item)\">\n                {{ item.name }}\n              </td>\n              <td class=\"title\">\n                 {{ item.supplier }}\n              </td>\n              <td class=\"title\">\n                 {{ item.code }}\n              </td>\n              <td class=\"title\">\n                 {{ item.product }}\n              </td>\n              <td class=\"title\">\n                 {{ item.colour }}\n              </td>\n              <td class=\"title\">\n                 {{ item.install }}\n              </td>\n              <td class=\"title\">\n                 ${{ item.price }}\n              </td>\n            </tr>\n\n          </tbody>\n        </table>\n      </div>\n      <br>\n      <div class=\"form-group\">\n        <button class=\"btn btn-primary pull-right\" (click)=\"deleteAreas()\"><i class=\"fa fa-user\"></i> Delete Selected</button>\n      </div>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <h5>Assign to Unit Types</h5>\n    <ul class=\"form-control villages_list\">\n      <li *ngFor=\"let item of unitTypes \">\n        <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectUnitType($event)\" />\n        <span>{{item.name}}</span>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<br>\n\n<div class=\"row\">\n  <div class=\"col-md-6 col-sm-12s col-md-offset-3 text-center\">\n    <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n     </button>\n    <button [disabled] =\"colSchema.name.length < 3\" class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n    </button>\n  </div>\n</div>\n\n"

/***/ }),
/* 293 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">ColourScheme Details</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>ColourScheme Details</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <input type=\"text\" name=\"name\" placeholder=\"Enter Colour Schemes Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"colSchema.name\"\n    #name=\"ngModel\" required>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <ul class=\"form-control villages_list\">\n      <li *ngFor=\"let item of unitTypes \">\n        <input type=\"checkbox\" name=\"select\" [checked]=\"item.checked\" value=\"{{item._id}}\" (change)=\"selectUnitType($event)\" />\n        <span>{{item.name}}</span>\n      </li>\n    </ul>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n      <div class=\"form-group\">\n        <button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#createAreaModal\"><i class=\"fa fa-user\"></i> Create New Area</button>\n        <div class=\"modal fade\" id=\"createAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n          <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header text-center\">\n                <h4 class=\"modal-title\">Create New Area</h4>\n              </div>\n              <div class=\"modal-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Name</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.name\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Supplier</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.supplier\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Code</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_code\" placeholder=\"Enter Area Code\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.code\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Product</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_product\" placeholder=\"Enter Area Product\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.product\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Colour</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_colour\" placeholder=\"Enter Area Colour\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.colour\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Install Details</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_install\" placeholder=\"Enter Area Install Details\" minlength=\"3\" class=\"form-control\" [(ngModel)]=\"newArea.install\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Price</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_price\" placeholder=\"Enter Area Price\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newArea.price\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><button class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"createArea()\">Save</button></div>\n                <div class=\"col-sm-4 col-xs-4\"><button class=\"btn btn-default\" data-dismiss=\"modal\" >Cancel</button></div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"modal fade\" id=\"editAreaModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n          <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header text-center\">\n                <h4 class=\"modal-title\">Area Details</h4>\n              </div>\n              <div class=\"modal-body\">\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Name</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\"  [(ngModel)]=\"selectedArea.name\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Supplier</strong> </div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_name\" placeholder=\"Enter New Area Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.supplier\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Code</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_code\" placeholder=\"Enter Area Code\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.code\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Product</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_product\" placeholder=\"Enter Area Product\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.product\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Colour</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_colour\" placeholder=\"Enter Area Colour\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.colour\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Install Details</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_install\" placeholder=\"Enter Area Install Details\" minlength=\"3\" class=\"form-control\" [(ngModel)]=\"selectedArea.install\">\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-sm-4 col-xs-4 item_field\"><strong>Price</strong></div>\n                  <div class=\"col-sm-4 col-xs-4\">\n                    <input type=\"text\" name=\"area_price\" placeholder=\"Enter Area Price\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"selectedArea.price\">\n                  </div>\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <div class=\"col-sm-4 col-xs-4 item_field\"><button class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"saveArea()\">Save</button></div>\n                <div class=\"col-sm-4 col-xs-4\"><button class=\"btn btn-default\" data-dismiss=\"modal\" >Cancel</button></div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"table-responsive\">\n        <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n          <thead>\n            <tr>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                  #\n              </th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Name</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Supplier</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Code</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Product</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Colour</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Install</th>\n              <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Price</th>\n            </tr>\n          </thead>\n          <tbody *ngFor=\"let item of areas\">\n            <tr>\n              <td class=\"title\">\n                <input type=\"checkbox\" name=\"select\" value=\"{{item.supplier}}\" (change)=\"selectArea($event)\" />\n              </td>\n              <td class=\"title\" data-toggle=\"modal\" data-target=\"#editAreaModal\" style=\"cursor: pointer; color: #23527c;\" (click)=\"editArea(item)\">\n                {{ item.name }}\n              </td>\n              <td class=\"title\">\n                 {{ item.supplier }}\n              </td>\n              <td class=\"title\">\n                 {{ item.code }}\n              </td>\n              <td class=\"title\">\n                 {{ item.product }}\n              </td>\n              <td class=\"title\">\n                 {{ item.colour }}\n              </td>\n              <td class=\"title\">\n                 {{ item.install }}\n              </td>\n              <td class=\"title\">\n                 {{ item.price }}\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <br>\n      <div class=\"form-group\">\n        <button class=\"btn btn-primary pull-right\" (click)=\"deleteAreas()\"><i class=\"fa fa-user\"></i> Delete Selected</button>\n      </div>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-md-6 col-sm-12s col-md-offset-3 text-center\">\n    <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n     </button>\n    <button [disabled] =\"name.invalid\" class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n    </button>\n  </div>\n</div>\n\n"

/***/ }),
/* 294 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Create New UnitType</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Create New UnitType</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <input type=\"text\" name=\"name\" placeholder=\"Enter UnitType Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"newUnitType.name\"\n    #name=\"ngModel\" required>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <ul class=\"form-control villages_list\">\n      <li *ngFor=\"let item of villages \">\n        <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectVillage($event)\" />\n        <span>{{item.name}}</span>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<br>\n\n<div class=\"row\">\n  <div class=\"col-md-6 col-sm-12s col-md-offset-3 text-center\">\n    <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n     </button>\n    <button [disabled] =\"newUnitType.name.length < 3\" class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n    </button>\n  </div>\n</div>\n\n"

/***/ }),
/* 295 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">UnitType Details</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>UnitType Details</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <input type=\"text\" name=\"name\" placeholder=\"Enter UnitType Name\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"unitType.name\"\n    #name=\"ngModel\" required>\n  </div>\n</div>\n<br>\n<div class=\"row\">\n  <div class=\"col-sm-6 col-md-6 col-xs-12 col-md-offset-3\">\n    <ul class=\"form-control villages_list\">\n      <li *ngFor=\"let v of villages \">\n          <input type=\"checkbox\" [checked]=\"v.checked\" name=\"select\" value=\"{{v._id}}\" (change)=\"selectVillage($event)\" />\n          <span>{{v.name}}</span>\n      </li>\n    </ul>\n  </div>\n</div>\n\n<br>\n\n<div class=\"row\">\n  <div class=\"col-md-6 col-sm-12s col-md-offset-3 text-center\">\n    <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n     </button>\n    <button [disabled]=\"name.invalid\" class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n    </button>\n  </div>\n</div>\n\n"

/***/ }),
/* 296 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Unit Types</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Unit Types</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n\n<div class=\"row\">\n\t<div class=\"col-sm-12\">\n\t    <div class=\"form-group\">\n\t      <a [routerLink]=\"['/uni-types/create']\" class=\"btn btn-primary\"><i class=\"fa fa-user\"></i> Create New Unit Type</a>\n\t    </div>\n\n\t\t<div class=\"col-md-12 col-sm-12s\">\n\t  \t\t<div class=\"table-responsive\">\n\t    \t\t<table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n\t    \t\t\t<thead>\n\t\t\t            <tr>\n\t\t\t            \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n\t\t\t                \t#\n\t\t\t              \t</th>\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Name</th>\n\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Village Assigned To</th>\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Status</th>\n\t\t\t            </tr>\n\t\t\t        </thead>\n\n\t\t\t        <tbody *ngFor=\"let item of unitTypes\">\n\t\t\t            <tr>\n\t\t\t              <td class=\"title\">\n\t\t\t                <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n\t\t\t              </td>\n\t\t\t              <td class=\"title\">\n\t\t\t                 <a [routerLink]=\"['/uni-types', item._id]\">{{ item.name }}</a>\n\t\t\t              </td>\n\t\t\t\t\t\t  <td class=\"title\">\n\t\t\t                {{ item.villages_assigned }}\n\t\t\t              </td>\n\t\t\t              <td class=\"title\">{{ item.status ? 'active' : 'inactive' }}</td>\n\t\t\t            </tr>\n\n\t\t\t        </tbody>\n\t\t\t    </table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"row\" *ngIf=\"unitTypes.length != 0 \">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"form-group\">\n      <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deleteUnitTypes()\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n      <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deactivateUnitTypes()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n      <button  type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"reactivateUnitTypes()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 297 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Create New Village</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Create New Village</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"col-sm-5 col-md-5\">\n      <input type=\"text\" name=\"name\" placeholder=\"Enter Village Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"village.name\"\n        #name=\"ngModel\" required>\n    </div>\n  </div>\n</div>\n<br>\n\n<div class=\"row\">  \n  <div class=\"col-md-6 col-sm-12s text-center\">\n    <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n     </button>\n    <button class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n    </button>\n  </div>\n</div>\n\n"

/***/ }),
/* 298 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Edit Village</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Edit Village</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"col-sm-5 col-md-5\">\n      <input type=\"text\" name=\"name\" placeholder=\"Enter Village Name\" minlength=\"3\"  class=\"form-control\" [(ngModel)]=\"village.name\"\n        #name=\"ngModel\" required>\n    </div>\n  </div>\n</div>\n<br>\n\n<div class=\"row\">  \n  <div class=\"col-md-6 col-sm-12s text-center\">\n    <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n        Cancel\n     </button>\n    <button class=\"btn btn-info  btn-primary\" (click)=\"save()\">\n        Save\n    </button>\n  </div>\n</div>\n\n"

/***/ }),
/* 299 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Villages</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Villages</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n\n\n<div class=\"row\">\n\t<div class=\"col-sm-12\">\n\t    <div class=\"form-group\">\n\t      <a [routerLink]=\"['/vils/create']\" class=\"btn btn-primary\"><i class=\"fa fa-user\"></i> Create New Village</a>\n\t    </div>\n\n\t\t<div class=\"col-md-12 col-sm-12s\">\n\t  \t\t<div class=\"table-responsive\">\n\t    \t\t<table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n\t    \t\t\t<thead>\n\t\t\t            <tr>\n\t\t\t            \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n\t\t\t                \t#\n\t\t\t              \t</th>\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Name</th>\n\t\t\t              \t<th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Status</th>\n\t\t\t            </tr>\n\t\t\t        </thead>\n\t\t\t        <tbody *ngFor=\"let item of villages\">\n\t\t\t            <tr>\n\t\t\t              <td class=\"title\">\n\t\t\t                <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n\t\t\t              </td>\n\t\t\t              <td class=\"title\">\t\t\t                \n\t\t\t                 <a [routerLink]=\"['/vils', item._id]\">{{ item.name }}</a>\t\t\n\t\t\t              </td>\n\t\t\t              <td class=\"title\">{{ item.status ? 'active' : 'inactive' }}</td>\n\t\t\t            </tr>\n\t\t\t        </tbody>\n\t\t\t    </table>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<br>\n<div class=\"row\" *ngIf=\"villages.length != 0\">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"form-group\">\n      <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deleteVils()\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n      <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deactivateVils()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n      <button  type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"reactivateVils()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n    </div>\n  </div>\n</div>"

/***/ }),
/* 300 */
/***/ (function(module, exports) {

module.exports = "<!-- page title -->\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Store Details</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Store Details</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n<div class=\"hr-line-dashed\"></div>\n<div class=\"row\">\n    <form class=\"form-horizontal group-border stripped\" #storeForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n        <div class=\"col-sm-12 col-md-8 col-lg-8 col-lg-offset-2 col-md-offset-2\">\n            <div class=\"panel panel-card margin-b-30\">\n                <div class=\"well\">\n                    <h4 class=\"mb-xlg\">Store Information</h4>\n                    <div class=\"panel-body\">\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': title.touched && title.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Store Title</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"title\" placeholder=\"Enter Store Title\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"store.store_title\" #title=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': store_type.touched && store_type.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Store Type</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"store_type\" placeholder=\"Enter Store Type\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"store.store_type\" #store_type=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': email.touched && email.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Email</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"store.email\" #email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': phone.touched && phone.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Phone</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"store_info.phone\" #phone=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': mobile.touched && mobile.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Mobile</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"mobile\" placeholder=\"Mobile number\" class=\"form-control\" [(ngModel)]=\"store_info.mobile\" #mobile=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': fax.touched && fax.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Fax</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"fax\" placeholder=\"Fax \" class=\"form-control\" [(ngModel)]=\"store_info.fax\" #fax=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address1.touched && address1.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Address</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" placeholder=\"\" class=\"form-control\" name=\"address1\" [(ngModel)]=\"store_info.address.address1\" #address1=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address2.touched && address2.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\"></label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" placeholder=\"\" class=\"form-control\" name=\"address2\" [(ngModel)]=\"store_info.address.address2\" #address2=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': region.touched && region.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Region</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"region\" [(ngModel)]=\"store_info.region\" (change)=\"selectRegion($event)\" #region=\"ngModel\" required>\n                                    <option *ngFor=\"let reg of regions\" [value]=\"reg\">{{ reg }}</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': city.touched && city.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">City</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"city\" [(ngModel)]=\"store_info.city\" name=\"city\" #city=\"ngModel\" required>\n                                    <option *ngFor=\"let city of cities\" [value]=\"city\">{{city}}</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': post_code.touched && post_code.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Post Code</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" placeholder=\"Enter Post Code\" name=\"post_code\" class=\"form-control\" [(ngModel)]=\"store_info.postcode\" #post_code=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': country.touched && country.invalid }\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Country</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"country\" [(ngModel)]=\"store_info.country\" required #country=\"ngModel\">\n                                    <option value=\"new zealand\">New Zealand</option>\n                                </select>\n                            </div>\n                            <!--<div *ngIf=\"storeForm.submitted && !country.valid\" class=\"help-block\">Country is required</div> -->\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-3 col-md-3 control-label\">Parent</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"parent\" [(ngModel)]=\"store.parent\" #parent=\"ngModel\">\n                                    <option value=\"\" selected=\"\"></option>\n                                    <option *ngFor=\"let s of stores\" [value]=\"s._id\">{{ s.store_title }}</option>\n                                </select>\n                            </div>\n                        </div>\n                        <h4 class=\"mb-xlg\">Accounts Information</h4>\n                        <div class=\"panel-body\">\n                            <div class=\"form-group\">\n                                <label class=\"col-lg-3 col-md-3 control-label\">Bank Account</label>\n                                <div class=\"col-lg-8 col-md-8\">\n                                    <input type=\"text\" name=\"bank_account\" placeholder=\"Enter Bank Account\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.bank_account\" #bank_account=\"ngModel\">\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label class=\"col-lg-3 col-md-3 control-label\">GST Number</label>\n                                <div class=\"col-lg-8 col-md-8\">\n                                    <input type=\"text\" name=\"gst_number\" placeholder=\"Enter GST Number\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.gst_number\" #gst_number=\"ngModel\">\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label class=\"col-lg-3 col-md-3 control-label\">Accounts Payable Email</label>\n                                <div class=\"col-lg-8 col-md-8\">\n                                    <input type=\"text\" name=\"payable_email\" placeholder=\"Enter Accounts Payable Email\" class=\"form-control\" [(ngModel)]=\"account_info.payable_email\" #payable_email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <div class=\"row text-center\">\n                                <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n                                    Cancel\n                                </button>\n                                <button class=\"btn btn-info btn-primary\" [disabled]=\"storeForm.invalid\" type=\"submit\">\n                                    Save\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </form>\n</div>"

/***/ }),
/* 301 */
/***/ (function(module, exports) {

module.exports = "<!-- page title -->\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Store Details</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Store Details</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n<div class=\"hr-line-dashed\"></div>\n<div class=\"row\">\n    <form class=\"form-horizontal group-border stripped\" #storeForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\n            <div class=\"panel panel-card margin-b-30\">\n                <div class=\"well\">\n                    <h4 class=\"mb-xlg\">Store Information</h4>\n                    <div class=\"panel-body\">\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': title.touched && title.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Store Title</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"title\" placeholder=\"Enter Store Title\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"store.store_title\" #title=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': store_type.touched && store_type.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Store Type</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"store_type\" placeholder=\"Enter Store Type\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"store.store_type\" #store_type=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': email.touched && email.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Email</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"store.email\" #email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': phone.touched && phone.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Phone</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"store_info.phone\" #phone=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': mobile.touched && mobile.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Mobile</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"mobile\" placeholder=\"Mobile number\" class=\"form-control\" [(ngModel)]=\"store_info.mobile\" #mobile=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': fax.touched && fax.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Fax</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"fax\" placeholder=\"Fax \" class=\"form-control\" [(ngModel)]=\"store_info.fax\" #fax=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address1.touched && address1.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Address</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" placeholder=\"\" class=\"form-control\" name=\"address1\" [(ngModel)]=\"address.address1\" #address1=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': address2.touched && address2.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\"></label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" class=\"form-control\" name=\"address2\" [(ngModel)]=\"address.address2\" #address2=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': region.touched && region.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Region</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"region\" [(ngModel)]=\"store_info.region\" (change)=\"selectRegion($event)\" #region=\"ngModel\" required>\n                                <option *ngFor=\"let reg of regions\" [value]=\"reg\">{{ reg }}</option>\n                            </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': city.touched && city.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">City</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"city\" [(ngModel)]=\"store_info.city\" name=\"city\" #city=\"ngModel\" required>\n                                <option *ngFor=\"let city of cities\" [value]=\"city\">{{city}}</option>\n                            </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': post_code.touched && post_code.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Post Code</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" placeholder=\"Enter Post Code\" name=\"post_code\" class=\"form-control\" [(ngModel)]=\"store_info.postcode\" #post_code=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': country.touched && country.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Country</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"country\" [(ngModel)]=\"store_info.country\" required #country=\"ngModel\">\n                                <option value=\"new zealand\">New Zealand</option>\n                            </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Parent</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"parent\" [(ngModel)]=\"store.parent\" #parent=\"ngModel\">\n                                    <option value=\"\" selected=\"\"></option>\n                                    <option *ngFor=\"let s of stores\" [value]=\"s._id\">{{ s.store_title }}</option>\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n                    <h4 class=\"mb-xlg\">Account Information</h4>\n                    <div class=\"panel-body\">\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Bank Account</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"bank_account\" placeholder=\"Enter Bank Account\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.bank_account\" #bank_account=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">GST Number</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"gst_number\" placeholder=\"Enter GST Number\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"account_info.gst_number\" #gst_number=\"ngModel\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Accounts Payable Email</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"payable_email\" placeholder=\"Enter Accounts Payable Email\" class=\"form-control\" [(ngModel)]=\"account_info.payable_email\" #payable_email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\">\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\n            <div class=\"panel panel-card margin-b-30\">\n                <div class=\"well\">\n                    <h4 class=\"mb-xlg\">User Directory</h4>\n                    <div class=\"panel-body\">\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Assigned Users</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <ul class=\"form-control villages_list\">\n                                    <li *ngFor=\"let item of users \">\n                                        <span>{{item.username}}</span>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <div class=\"row text-center\">\n                                <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n                                Cancel\n                            </button>\n                                <button type=\"submit\" class=\"btn btn-info  btn-primary\">\n                                Save\n                            </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>"

/***/ }),
/* 302 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Store Management</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Store Management</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <ngx-loading [show]=\"loading\"></ngx-loading>\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'super'\">\n            <a [routerLink]=\"['/createstore']\" class=\"btn btn-primary\"><i class=\"fa fa-building\"></i> Create New Store</a>\n        </div>\n        <div class=\"form-group\" *ngIf=\" user.accounttype === 'staff' || user.accounttype === 'customer'\">\n            <ng-container *ngIf=\"store_permission.create\">\n                <a [routerLink]=\"['/createstore']\" class=\"btn btn-primary\"><i class=\"fa fa-building\"></i> Create New Store</a>\n            </ng-container>\n        </div>\n        <div class=\"well\">\n            <div class=\"row\">\n                <div class=\"col-sm-2\">\n                    <div class=\"form-group\">\n                        <label for=\"\" class=\"control-label\">Filter By</label>\n                    </div>\n                </div>\n                <div class=\"col-sm-3\">\n                    <div class=\"form-group\">\n                        <label class=\"col-lg-2 col-md-3 control-label\">Region</label>\n                        <div class=\"col-lg-8 col-md-8\">\n                            <select class=\"fancy-select form-control\" name=\"region\" [(ngModel)]=\"filterRegion\" (change)=\"selectRegion($event)\" #region=\"ngModel\">\n                                <option value=\"\" selected>All Regions</option>\n                                <option *ngFor=\"let reg of regions\" [value]=\"reg\">{{ reg }}</option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-sm-3\">\n                    <div class=\"form-group\">\n                        <label class=\"col-lg-2 col-md-3 control-label\">City</label>\n                        <div class=\"col-lg-8 col-md-8\">\n                            <select class=\"fancy-select form-control\" [(ngModel)]=\"filterCity\" name=\"city\" #city=\"ngModel\" (change)=\"selectCity($event)\">\n                                <option value=\"\" selected>All Cities</option>\n                                <option *ngFor=\"let city of cities\" [value]=\"city\">{{city}}</option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"col-md-12 col-sm-12s\">\n            <div class=\"table-responsive\">\n                <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n                    <thead>\n                        <tr>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                #\n                            </th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Store</th>\n                            <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Contact</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">City</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"1\">Status</th>\n                        </tr>\n                    </thead>\n                    <tbody *ngFor=\"let item of filteredStores\">\n                        <tr>\n                            <ng-container *ngIf=\"user.accounttype === 'super'\">\n                                <td class=\"title\">\n                                    <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectElement($event)\">\n                                </td>\n                                <td class=\"title\"><a [routerLink]=\"['/store', item._id]\">{{ item.store_title }}</a></td>\n                                <td class=\"title\">{{ item.email }}</td>\n                                <td class=\"title\">{{ item.store_info.city}}</td>\n                                <td class=\"title\">\n                                    <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                    <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                                </td>\n                            </ng-container>\n                            <ng-container *ngIf=\"user.accounttype === 'staff' || user.accounttype === 'customer'\">\n                                <td class=\"title\">\n                                    <input type=\"checkbox\" value=\"{{item._id}}\" (change)=\"selectElement($event)\">\n                                </td>\n                                <td class=\"title\">\n                                    <ng-container *ngIf=\"store_permission.edit\">\n                                        <a [routerLink]=\"['/store', item._id]\">{{ item.store_title }}</a>\n                                    </ng-container>\n                                    <ng-container *ngIf=\"!store_permission.edit\">\n                                        {{ item.store_title }}\n                                    </ng-container>\n                                </td>\n                                <td class=\"title\">{{ item.key_contact }}</td>\n                                <td class=\"title\">{{ item.store_info.city}}</td>\n                                <td class=\"title\">\n                                    <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                    <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                                </td>\n                            </ng-container>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n<br>\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <ng-container *ngIf=\"user.accounttype === 'super'\">\n            <div class=\"form-group\">\n                <button type=\"button\" id=\"button-filter\" (click)=\"deleteStores()\" class=\"btn btn-primary \"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n\n                <button type=\"button\" id=\"button-filter\" (click)=\"deactivateStores()\" class=\"btn btn-primary \"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n\n                <button type=\"button\" id=\"button-filter\" (click)=\"reactivateStores()\" class=\"btn btn-primary \"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n            </div>\n\n        </ng-container>\n        <ng-container *ngIf=\"user.accounttype === 'customer' || user.accounttype === 'staff' \">\n            <div class=\"form-group\">\n                <ng-container *ngIf=\"store_permission.delete\">\n                    <button type=\"button\" id=\"button-filter\" (click)=\"deactivateStores()\" class=\"btn btn-primary \"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n\n                    <button type=\"button\" id=\"button-filter\" (click)=\"reactivateStores()\" class=\"btn btn-primary \"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n                </ng-container>\n            </div>\n\n        </ng-container>\n\n    </div>\n</div>"

/***/ }),
/* 303 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">Support Office</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>Support Office</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n<div class=\"row\">\n    <form class=\"form-horizontal group-border stripped\" #supportForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n        <div class=\"col-sm-12 col-md-12 col-lg-12\">\n            <div class=\"panel panel-card margin-b-30\">\n                <div class=\"well\">\n                    <h4 class=\"mb-xlg\">Support Office</h4>\n                    <div class=\"panel-body\">\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': title.touched && title.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Store Title</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"title\" placeholder=\"Enter Store Title\" minlength=\"4\" class=\"form-control\" [(ngModel)]=\"office.store_title\" #title=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error': email.touched && email.invalid }\">\n                            <label class=\"col-lg-4 col-md-4 control-label\">Email</label>\n                            <div class=\"col-lg-8 col-md-8\">\n                                <input type=\"text\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"office.email\" #email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <div class=\"row text-center\">\n                                <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n                                    Cancel\n                                </button>\n                                <button type=\"submit\" class=\"btn btn-info  btn-primary\"  [disabled]=\"!supportForm.form.valid\">\n                                    Save\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>"

/***/ }),
/* 304 */
/***/ (function(module, exports) {

module.exports = "<!-- page title -->\n<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div class=\"page-title\">\n      <div class=\"row\">\n        <h4 class=\"pull-left\">Create User</h4>\n        <ol class=\"breadcrumb pull-right\">\n          <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n          <li>Create User</li>\n        </ol>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- end .page title-->\n<div class=\"row\">\n  <div class=\"col-sm-12 col-md-12\">\n    <div class=\"well\">\n      <div class=\"row\">\n        <div class=\"col-sm-2  col-md-3\">\n          <h4>User Type</h4>\n        </div>\n        <ng-container *ngIf=\"user.accounttype==='super'\">\n          <div class=\"col-sm-2  col-md-3\">\n            <label>\n                <input type=\"radio\" id=\"staff\" name=\"usertype\" value=\"staff\" [(ngModel)]=\"usertype\"> Staff\n            </label>\n          </div>\n          <div class=\"col-sm-2  col-md-3 \">\n            <label>\n                <input type=\"radio\" id=\"customer\" name=\"usertype\" value=\"customer\" [(ngModel)]=\"usertype\"> Customer\n            </label>\n          </div>\n        </ng-container>\n        <ng-container *ngIf=\"user.accounttype==='staff' || user.accounttype==='customer'\">\n          <ng-container *ngIf=\"user.role\">\n            <ng-container *ngIf=\" user.role.staff.create\">\n              <div class=\"col-sm-2  col-md-3\">\n                <div>\n                  <label>\n                      <input type=\"radio\" id=\"staff\" name=\"usertype\" value=\"staff\" [(ngModel)]=\"usertype\"> Staff\n                  </label>\n                </div>\n              </div>\n            </ng-container>\n            <ng-container *ngIf=\" user.role.customer.create\">\n              <div class=\"col-sm-2  col-md-3\">\n                <div>\n                  <label>\n                      <input type=\"radio\" id=\"customer\" name=\"usertype\" value=\"customer\" [(ngModel)]=\"usertype\"> Customer\n                  </label>\n                </div>\n              </div>\n            </ng-container>\n          </ng-container>\n          <ng-container *ngIf=\"user.special_permissions\">\n            <ng-container *ngIf=\"user.special_permissions.staff.create\">\n              <div class=\"col-sm-2  col-md-3 \">\n                <div>\n                  <label>\n                      <input type=\"radio\" id=\"staff\" name=\"usertype\" value=\"staff\" [(ngModel)]=\"usertype\"> Staff\n                  </label>\n                </div>\n              </div>\n            </ng-container>\n            <ng-container *ngIf=\"user.special_permissions.customer.create\">\n              <div class=\"col-sm-2  col-md-3 \">\n                <div>\n                  <label>\n                      <input type=\"radio\" id=\"customer\" name=\"usertype\" value=\"customer\" [(ngModel)]=\"usertype\"> Customer\n                  </label>\n                </div>\n              </div>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"hr-line-dashed\"></div>\n<div class=\"row\" *ngIf=\"usertype === 'staff'\">\n  <staff-user></staff-user>\n</div>\n<div class=\"row\" *ngIf=\"usertype === 'customer'\">\n  <customer-user></customer-user>\n</div>"

/***/ }),
/* 305 */
/***/ (function(module, exports) {

module.exports = "<!-- end .page title-->\n<div class=\"row\">\n    <form class=\"form-horizontal group-border stripped\" name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n        <div class=\"col-md-6 margin-b-30\">\n            <div class=\"profile-overview\">\n                <div class=\"profile-edit\">\n                    <h4 class=\"mb-xlg\">Personal Information</h4>\n                    <fieldset>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : username.invalid && username.touched }\">\n                            <label class=\"col-md-3 control-label\" for=\"profileName\">Name</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" name=\"username\" id=\"profileName\" placeholder=\"Enter Your UserName\" minlength=\"4\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"customer.username\" #username=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : email.invalid && email.touched}\">\n                            <label class=\"col-md-3 control-label\" for=\"profileEmail\">Email</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profileEmail\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"customer.email\" #email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : phone.invalid && phone.touched}\">\n                            <label class=\"col-md-3 control-label\" for=\"profilePhone\">Phone</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profilePhone\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.phone\" #phone=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : mobile.invalid && mobile.touched}\">\n                            <label class=\"col-md-3 control-label\" for=\"profileMobile\">Mobile</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profileMobile\" name=\"mobile\" placeholder=\"Mobile number\" class=\"form-control\" [(ngModel)]=\"user_info.mobile\" #mobile=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : position.invalid && position.touched}\">\n                            <label class=\"col-md-3 control-label\" for=\"profilePosition\">Position</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profilePosition\" placeholder=\"Enter Position\" class=\"form-control\" name=\"position\" [(ngModel)]=\"customer_info.position\" #position=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : prefered_contact.invalid && prefered_contact.touched}\">\n                            <label class=\"col-md-3 control-label\" for=\"prefered_contact\">Prefered Contact Method</label>\n                            <div class=\"col-md-8\">\n                                <select class=\"fancy-select form-control\" name=\"prefered_contact\" [(ngModel)]=\"customer_info.prefered_contact\" required #prefered_contact=\"ngModel\">\n                                    <option value=\"phone\">Phone</option>\n                                    <option value=\"mobile\">Mobile</option>\n                                    <option value=\"email\">Email</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-md-3 control-label\">Assigned Company(s)</label>\n                            <div class=\"col-md-8\">\n                                <ul class=\"form-control villages_list\">\n                                    <li *ngFor=\"let item of companies; let i = index \">\n                                        <input type=\"checkbox\" name=\"selectCompany\" value=\"{{item._id}}\" (change)=\"selectCompany($event)\" />\n                                        <span>{{item.name}}</span>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </fieldset>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-6 margin-b-30\">\n            <div class=\"profile-edit\">\n                <hr class=\"dotted tall\">\n                <div class=\"avtar text-center\">\n                    <img [src]=\"photoUrl\" alt=\"Preview\" class=\"img-thumbnail img-responsive\" style=\"width:30%; height: 30%;\">\n                    <hr>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-2 col-md-3 control-label\">Photo</label>\n                    <div class=\"col-lg-3 col-md-3\">\n                        <input type=\"file\" (change)=\"readPhoto($event)\" placeholder=\"Upload logo...\" />\n                    </div>\n                </div>\n                <h4 class=\"mb-xlg\">Permission & Access</h4>\n                <fieldset>\n                    <div class=\"form-group\">\n                        <label class=\"col-md-3 control-label\" for=\"profileRole\">Role</label>\n                        <div class=\"col-md-3\" *ngIf=\"modalValid\">\n                            <select class=\"fancy-select form-control\" id=\"profileRole\" name=\"role\" [(ngModel)]=\"customer.role_name\" #role=\"ngModel\">\n                                <option *ngFor=\"let r of roles\" [value]=\"r.role_name\">{{r.role_name}}</option>\n                            </select>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#roleModal\"> Manage This User's Permission</button>\n                        </div>\n                        <div class=\"modal fade\" id=\"roleModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n                            <div class=\"modal-dialog\">\n                                <div class=\"modal-content\">\n                                    <div class=\"modal-header text-center\">\n                                        <h4 class=\"modal-title\">Manage This User's Permission</h4>\n                                    </div>\n                                    <div class=\"modal-body\">\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-12\">\n                                                <div class=\"col-md-12 col-sm-12s\">\n                                                    <div class=\"table-responsive\">\n                                                        <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n                                                            <thead>\n                                                                <tr>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                                                        Permitted Action\n                                                                    </th>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Create</th>\n                                                                    <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Edit</th>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Deactivate</th>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"5\">View Only</th>\n                                                                </tr>\n                                                            </thead>\n                                                            <tbody>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Staff Users\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_staff\" [checked]=\"staffPermission.create\" (change)=\"staffPermission.create = !staffPermission.create\" />\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_staff\" [checked]=\"staffPermission.edit\" (change)=\"staffPermission.edit = !staffPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_staff\" [checked]=\"staffPermission.delete\" (change)=\"staffPermission.delete = !staffPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_staff\" [checked]=\"staffPermission.view\" (change)=\"staffPermission.view = !staffPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Customer Users\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_customer\" [checked]=\"customerPermission.create\" (change)=\"customerPermission.create = !customerPermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_customer\" [checked]=\"customerPermission.edit\" (change)=\"customerPermission.edit = !customerPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_customer\" [checked]=\"customerPermission.delete\" (change)=\"customerPermission.delete = !customerPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_customer\" [checked]=\"customerPermission.view\" (change)=\"customerPermission.view = !customerPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Stores\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_store\" [checked]=\"storePermission.create\" (change)=\"storePermission.create = !storePermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_store\" [checked]=\"storePermission.edit\" (change)=\"storePermission.edit = !storePermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_store\" [checked]=\"storePermission.delete\" (change)=\"storePermission.delete = !storePermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_store\" [checked]=\"storePermission.view\" (change)=\"storePermission.view = !storePermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Orders\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_order\" [checked]=\"orderPermission.create\" (change)=\"orderPermission.create  = !orderPermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_order\" [checked]=\"orderPermission.edit\" (change)=\"orderPermission.edit = !orderPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_order\" [checked]=\"orderPermission.delete\" (change)=\"orderPermission.delete = !orderPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_order\" [checked]=\"orderPermission.view\" (change)=\"orderPermission.view = !orderPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage User Roles\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_role\" [checked]=\"rolePermission.create\" (change)=\"rolePermission.create = !rolePermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_role\" [checked]=\"rolePermission.edit\" (change)=\"rolePermission.edit = !rolePermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_role\" [checked]=\"rolePermission.delete\" (change)=\"rolePermission.delete = !rolePermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_role\" [checked]=\"rolePermission.view\" (change)=\"rolePermission.view = !rolePermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Companies\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_company\" [checked]=\"companyPermission.create\" (change)=\"companyPermission.create = !companyPermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_company\" [checked]=\"companyPermission.edit\" (change)=\"companyPermission.edit = !companyPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_company\" [checked]=\"companyPermission.delete\" (change)=\"companyPermission.delete = !companyPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_company\" [checked]=\"companyPermission.view\" (change)=\"companyPermission.view = !companyPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_all\" value=\"create\" (change)=\"selectAll($event)\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_all\" value=\"edit\" (change)=\"selectAll($event)\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_all\" value=\"delete\" (change)=\"selectAll($event)\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_all\" value=\"view\" (change)=\"selectAll($event)\"></td>\n                                                                </tr>\n                                                            </tbody>\n                                                        </table>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <br>\n                                            <div class=\"col-sm-6\">\n                                                <label for=\"\" class=\"col-md-5 control-label\">Home Screen</label>\n                                                <div class=\"col-md-7\">\n                                                    <select class=\"form-control m-b\" name=\"home_url\" [(ngModel)]=\"home_url\">\n                                                        <option value=\"\"></option>\n                                                        <option value=\"dashboard\">Dashboard</option>\n                                                        <option value=\"users\">Users</option>\n                                                        <option value=\"roles\">User Roles</option>\n                                                        <option value=\"stores\">Stores</option>\n                                                        <option value=\"orders\">Orders</option>\n                                                    </select>\n                                                </div>\n                                            </div>\n                                            <div class=\"col-sm-6\">\n                                                <input type=\"checkbox\" name=\"display_dashboard\" [checked]=\"display_dashboard\" (change)=\"display_dashboard = !display_dashboard\">\n                                                <label for=\"\">Display Dashboard</label>\n                                            </div>\n                                        </div>\n                                        <br>\n                                    </div>\n                                    <div class=\"modal-footer\">\n                                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                                        <button type=\"button\" class=\"btn btn-accent\" data-dismiss=\"modal\" (click)=\"savePermissions()\">Save changes</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" [ngClass]=\"{ 'has-error' : password.invalid && password.touched }\">\n                        <label class=\"col-md-3 control-label\" for=\"profilePassword\">Password</label>\n                        <div class=\"col-md-8\">\n                            <input type=\"password\" id=\"profilePassword\" placeholder=\"\" class=\"form-control\" name=\"password\" [(ngModel)]=\"customer.password\" #password=\"ngModel\" required>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" [ngClass]=\"{ 'has-error' : confirmpassword.invalid && confirmpassword.touched }\">\n                        <label class=\"col-md-3 control-label\" for=\"profileRepeatPassword\">Confirm Password</label>\n                        <div class=\"col-md-8\">\n                            <input type=\"password\" id=\"profileRepeatPassword\" placeholder=\"\" class=\"form-control\" name=\"confirmpassword\" [(ngModel)]=\"customer.confirm_password\" #confirmpassword=\"ngModel\" required>\n                            <div class=\"col-sm-6 col-sm-offset-3\" *ngIf=\"(customer.password !== customer.confirm_password) && (confirmpassword.dirty|| confirmpassword.touched )\">\n                                <div class=\"password_not_match\">The passwords entered do not match</div>\n                            </div>\n                        </div>\n                    </div>\n                </fieldset>\n                <div class=\"panel-footer\">\n                    <div class=\"row\">\n                        <div class=\"col-md-9 col-md-offset-3\">\n                            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!userForm.form.valid || (customer.password !== customer.confirm_password)\">Submit</button>\n                            <button type=\"reset\" class=\"btn btn-default\">Reset</button>\n                            <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>"

/***/ }),
/* 306 */
/***/ (function(module, exports) {

module.exports = "<!-- end .page title-->\n<div class=\"row\">\n    <div class=\"col-sm-12 col-md-12\">\n        <div class=\"panel panel-card margin-b-30\">\n            <div class=\"well\">\n                <div class=\"panel-body\">\n                    <form class=\"form-horizontal group-border stripped\" name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : username.invalid && username.touched }\">\n                            <label class=\"col-lg-2 col-md-3 control-label\">Name</label>\n                            <div class=\"col-lg-5 col-md-5\">\n                                <input type=\"text\" name=\"username\" placeholder=\"Enter Your UserName\" minlength=\"4\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"staff.username\" #username=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : email.invalid && email.touched }\">\n                            <label class=\"col-lg-2 col-md-3 control-label\">Email</label>\n                            <div class=\"col-lg-5 col-md-5\">\n                                <input type=\"email\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"staff.email\" #email=\"ngModel\" [email]=\"true\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : phone.invalid && phone.touched }\">\n                            <label class=\"col-lg-2 col-md-3 control-label\">Phone</label>\n                            <div class=\"col-lg-5 col-md-5\">\n                                <input type=\"text\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.phone\" #phone=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : mobile.invalid && mobile.touched }\">\n                            <label class=\"col-lg-2 col-md-3 control-label\">Mobile</label>\n                            <div class=\"col-lg-5 col-md-5\">\n                                <input type=\"text\" name=\"mobile\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.mobile\" #mobile=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label for=\"\" class=\"col-lg-2 col-md-3 control-label\">Stores</label>\n                            <div class=\"col-lg-5 col-md-5\">\n                                <ul class=\"form-control villages_list\">\n                                    <li *ngFor=\"let item of stores \">\n                                        <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectStores($event)\" />\n                                        <span>{{item.store_title}}</span>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-2  col-md-3 control-label\" for=\"profileRole\">Role</label>\n                            <div class=\"col-md-3\" *ngIf=\"modalValid\">\n                                <select class=\"fancy-select form-control\" id=\"profileRole\" name=\"role\" [(ngModel)]=\"staff.role_name\" #role=\"ngModel\">\n                                    <option *ngFor=\"let r of roles\" [value]=\"r.role_name\">{{r.role_name}}</option>\n                                </select>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#roleModal\"> Manage This User's Permission</button>\n                            </div>\n                            <div class=\"modal fade\" id=\"roleModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n                                <div class=\"modal-dialog\">\n                                    <div class=\"modal-content\">\n                                        <div class=\"modal-header text-center\">\n                                            <h4 class=\"modal-title\">Manage This User's Permission</h4>\n                                        </div>\n                                        <div class=\"modal-body\">\n                                            <div class=\"row\">\n                                                <div class=\"col-sm-12\">\n                                                    <div class=\"col-md-12 col-sm-12s\">\n                                                        <div class=\"table-responsive\">\n                                                            <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n                                                                <thead>\n                                                                    <tr>\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                                                            Permitted Action\n                                                                        </th>\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Create</th>\n                                                                        <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Edit</th>\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Deactivate</th>\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"5\">View Only</th>\n                                                                    </tr>\n                                                                </thead>\n                                                                <tbody>\n                                                                    <tr>\n                                                                        <td class=\"title\">\n                                                                            Manage Staff Users\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_staff\" [checked]=\"staffPermission.create\" (change)=\"staffPermission.create = !staffPermission.create\" />\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_staff\" [checked]=\"staffPermission.edit\" (change)=\"staffPermission.edit = !staffPermission.edit\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_staff\" [checked]=\"staffPermission.delete\" (change)=\"staffPermission.delete = !staffPermission.delete\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_staff\" [checked]=\"staffPermission.view\" (change)=\"staffPermission.view = !staffPermission.view\"></td>\n                                                                    </tr>\n                                                                    <tr>\n                                                                        <td class=\"title\">\n                                                                            Manage Customer Users\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_customer\" [checked]=\"customerPermission.create\" (change)=\"customerPermission.create = !customerPermission.create\">\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_customer\" [checked]=\"customerPermission.edit\" (change)=\"customerPermission.edit = !customerPermission.edit\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_customer\" [checked]=\"customerPermission.delete\" (change)=\"customerPermission.delete = !customerPermission.delete\">\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_customer\" [checked]=\"customerPermission.view\" (change)=\"customerPermission.view = !customerPermission.view\"></td>\n                                                                    </tr>\n                                                                    <tr>\n                                                                        <td class=\"title\">\n                                                                            Manage Stores\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_store\" [checked]=\"storePermission.create\" (change)=\"storePermission.create = !storePermission.create\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_store\" [checked]=\"storePermission.edit\" (change)=\"storePermission.edit = !storePermission.edit\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_store\" [checked]=\"storePermission.delete\" (change)=\"storePermission.delete = !storePermission.delete\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_store\" [checked]=\"storePermission.view\" (change)=\"storePermission.view = !storePermission.view\"></td>\n                                                                    </tr>\n                                                                    <tr>\n                                                                        <td class=\"title\">\n                                                                            Manage Orders\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_order\" [checked]=\"orderPermission.create\" (change)=\"orderPermission.create  = !orderPermission.create\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_order\" [checked]=\"orderPermission.edit\" (change)=\"orderPermission.edit = !orderPermission.edit\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_order\" [checked]=\"orderPermission.delete\" (change)=\"orderPermission.delete = !orderPermission.delete\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_order\" [checked]=\"orderPermission.view\" (change)=\"orderPermission.view = !orderPermission.view\"></td>\n                                                                    </tr>\n                                                                    <tr>\n                                                                        <td class=\"title\">\n                                                                            Manage User Roles\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_role\" [checked]=\"rolePermission.create\" (change)=\"rolePermission.create = !rolePermission.create\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_role\" [checked]=\"rolePermission.edit\" (change)=\"rolePermission.edit = !rolePermission.edit\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_role\" [checked]=\"rolePermission.delete\" (change)=\"rolePermission.delete = !rolePermission.delete\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_role\" [checked]=\"rolePermission.view\" (change)=\"rolePermission.view = !rolePermission.view\"></td>\n                                                                    </tr>\n                                                                    <tr>\n                                                                        <td class=\"title\">\n                                                                            Manage Companies\n                                                                        </td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_company\" [checked]=\"companyPermission.create\" (change)=\"companyPermission.create = !companyPermission.create\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_company\" [checked]=\"companyPermission.edit\" (change)=\"companyPermission.edit = !companyPermission.edit\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_company\" [checked]=\"companyPermission.delete\" (change)=\"companyPermission.delete = !companyPermission.delete\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_company\" [checked]=\"companyPermission.view\" (change)=\"companyPermission.view = !companyPermission.view\"></td>\n                                                                    </tr>\n                                                                    <tr>\n                                                                        <td class=\"title\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_all\" value=\"create\" (change)=\"selectAll($event)\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_all\" value=\"edit\" (change)=\"selectAll($event)\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_all\" value=\"delete\" (change)=\"selectAll($event)\"></td>\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_all\" value=\"view\" (change)=\"selectAll($event)\"></td>\n                                                                    </tr>\n                                                                </tbody>\n                                                            </table>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class=\"row\">\n                                                <br>\n                                                <div class=\"col-sm-6\">\n                                                    <label for=\"\" class=\"col-md-5 control-label\">Home Screen</label>\n                                                    <div class=\"col-md-7\">\n                                                        <select class=\"form-control m-b\" name=\"home_url\" [(ngModel)]=\"home_url\">\n                                                            <option value=\"\"></option>\n                                                            <option value=\"dashboard\">Dashboard</option>\n                                                            <option value=\"users\">Users</option>\n                                                            <option value=\"roles\">User Roles</option>\n                                                            <option value=\"stores\">Stores</option>\n                                                            <option value=\"orders\">Orders</option>\n                                                        </select>\n                                                    </div>\n                                                </div>\n                                                <div class=\"col-sm-6\">\n                                                    <input type=\"checkbox\" name=\"display_dashboard\" [checked]=\"display_dashboard\" (change)=\"display_dashboard = !display_dashboard\">\n                                                    <label for=\"\">Display Dashboard</label>\n                                                </div>\n                                            </div>\n                                            <br>\n                                        </div>\n                                        <div class=\"modal-footer\">\n                                            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                                            <button type=\"button\" class=\"btn btn-accent\" data-dismiss=\"modal\" (click)=\"savePermissions()\">Save changes</button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : password.invalid && password.touched }\">\n                            <label class=\"col-lg-2 col-md-3 control-label\">Password</label>\n                            <div class=\"col-lg-3 col-md-3\">\n                                <input type=\"Password\" name=\"password\" placeholder=\"\" class=\"form-control\" [(ngModel)]=\"staff.password\" #password=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : confirmPassword.invalid && confirmPassword.touched }\">\n                            <label class=\"col-lg-2 col-md-3 control-label\">Confirm Password</label>\n                            <div class=\"col-lg-3 col-md-3\">\n                                <input type=\"Password\" name=\"confirmPassword\" placeholder=\"\" class=\"form-control\" [(ngModel)]=\"staff.confirmPassword\" #confirmPassword=\"ngModel\" required>\n                                <div class=\"col-sm-6 col-sm-offset-3\" *ngIf=\"(staff.password !== staff.confirmPassword) && (confirmPassword.dirty|| confirmPassword.touched )\">\n                                    <div class=\"password_not_match\">The passwords entered do not match</div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-md-5\">\n                            <div class=\"form-group  text-center\">\n                                <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\n                                    Cancel\n                                </button>\n                                <button type=\"submit\" [disabled]=\"!userForm.form.valid  || (staff.password !== staff.confirmPassword) \" class=\"btn btn-info  btn-primary\">\n                                    Save\n                                </button>\n                            </div>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 307 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">User Details</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>User Details</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n\n<div class=\"row\">\n    <form class=\"form-horizontal group-border stripped\" name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"onSubmit()\" novalidate>\n        <div class=\"col-md-6 margin-b-30\">\n            <div class=\"profile-overview\">\n                <div class=\"profile-edit\">\n                    <h4 class=\"mb-xlg\">Personal Information</h4>\n                    <fieldset>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : username.invalid && username.touched }\">\n                            <label class=\"col-md-3 control-label\" for=\"profileName\">Name</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" name=\"username\" id=\"profileName\" placeholder=\"Enter Your UserName\" minlength=\"4\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"customer.username\" #username=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : email.invalid && email.touched }\">\n                            <label class=\"col-md-3 control-label\" for=\"profileEmail\">Email</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profileEmail\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"customer.email\" #email=\"ngModel\" [email]=\"true\" pattern=\"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : phone.invalid && phone.touched }\">\n                            <label class=\"col-md-3 control-label\" for=\"profilePhone\">Phone</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profilePhone\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.phone\" #phone=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : mobile.invalid && mobile.touched }\">\n                            <label class=\"col-md-3 control-label\" for=\"profileMobile\">Mobile</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profileMobile\" name=\"mobile\" placeholder=\"Mobile number\" class=\"form-control\" [(ngModel)]=\"user_info.mobile\" #mobile=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : position.invalid && position.touched }\">\n                            <label class=\"col-md-3 control-label\" for=\"profilePosition\">Position</label>\n                            <div class=\"col-md-8\">\n                                <input type=\"text\" id=\"profilePosition\" placeholder=\"Enter Position\" class=\"form-control\" name=\"position\" [(ngModel)]=\"customer_info.position\" #position=\"ngModel\" required>\n                            </div>\n                        </div>\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : prefered_contact.invalid && prefered_contact.touched }\">\n                            <label class=\"col-md-3 control-label\" for=\"profilePreferContactMethod\">Prefered Contact Method</label>\n                            <div class=\"col-md-8\">\n                                <select class=\"fancy-select form-control\" id=\"profilePreferContactMethod\" name=\"prefered_contact\" [(ngModel)]=\"customer_info.prefered_contact\" required #prefered_contact=\"ngModel\">\n                    <option value=\"phone\">Phone</option>\n                    <option value=\"mobile\">Mobile</option>\n                    <option value=\"email\">Email</option>\n                </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-lg-2 col-md-3 control-label\">Assigned Company(s)</label>\n                            <div class=\"col-md-8\">\n                                <ul class=\"form-control villages_list\">\n                                    <li *ngFor=\"let item of companies; let i = index \">\n                                        <input type=\"checkbox\" name=\"selectCompany\" [checked]=\"item.checked\" value=\"{{item._id}}\" (change)=\"selectCompany($event)\" />\n                                        <span>{{item.name}}</span>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </fieldset>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"col-md-6 margin-b-30\">\n            <div class=\"profile-edit\">\n                <hr class=\"dotted tall\">\n                <div class=\"avtar text-center\">\n                    <img [src]=\"photoUrl\" alt=\"Preview\" class=\"img-thumbnail img-responsive\" style=\"width:30%; height: 30%;\">\n                    <hr>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-2 col-md-3 control-label\">Photo</label>\n                    <div class=\"col-lg-3 col-md-3\">\n                        <input type=\"file\" (change)=\"readPhoto($event)\" placeholder=\"Upload logo...\" />\n                    </div>\n                </div>\n                <h4 class=\"mb-xlg\">Permission & Access</h4>\n                <fieldset>\n                    <div class=\"form-group\">\n                        <label class=\"col-md-3 control-label\" for=\"profileRole\">Role</label>\n                        <div class=\"col-md-4\">\n                            <select class=\"fancy-select form-control\" id=\"profileRole\" name=\"role\" [(ngModel)]=\"customer.role\" #role=\"ngModel\">\n                    <option value=\"\" ></option>\n                    <option *ngFor=\"let r of roles\" [value]=\"r.role_name\">{{r.role_name}}</option>\n                </select>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#roleModal\"> Manage This User's Permission</button>\n                        </div>\n                        <div class=\"modal fade\" id=\"roleModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\n                            <div class=\"modal-dialog\">\n                                <div class=\"modal-content\">\n                                    <div class=\"modal-header text-center\">\n                                        <h4 class=\"modal-title\">Manage This User's Permission</h4>\n                                    </div>\n                                    <div class=\"modal-body\">\n                                        <div class=\"row\">\n                                            <div class=\"col-sm-12\">\n                                                <div class=\"col-md-12 col-sm-12s\">\n                                                    <div class=\"table-responsive\">\n                                                        <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n                                                            <thead>\n                                                                <tr>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                                                        Permitted Action\n                                                                    </th>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Create</th>\n                                                                    <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Edit</th>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Deactivate</th>\n                                                                    <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"5\">View Only</th>\n                                                                </tr>\n                                                            </thead>\n                                                            <tbody>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Staff Users\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_staff\" [checked]=\"staffPermission.create\" (change)=\"staffPermission.create = !staffPermission.create\" />\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_staff\" [checked]=\"staffPermission.edit\" (change)=\"staffPermission.edit = !staffPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_staff\" [checked]=\"staffPermission.delete\" (change)=\"staffPermission.delete = !staffPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_staff\" [checked]=\"staffPermission.view\" (change)=\"staffPermission.view = !staffPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Customer Users\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_customer\" [checked]=\"customerPermission.create\" (change)=\"customerPermission.create = !customerPermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_customer\" [checked]=\"customerPermission.edit\" (change)=\"customerPermission.edit = !customerPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_customer\" [checked]=\"customerPermission.delete\" (change)=\"customerPermission.delete = !customerPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_customer\" [checked]=\"customerPermission.view\" (change)=\"customerPermission.view = !customerPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Stores\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_store\" [checked]=\"storePermission.create\" (change)=\"storePermission.create = !storePermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_store\" [checked]=\"storePermission.edit\" (change)=\"storePermission.edit = !storePermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_store\" [checked]=\"storePermission.delete\" (change)=\"storePermission.delete = !storePermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_store\" [checked]=\"storePermission.view\" (change)=\"storePermission.view = !storePermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage Orders\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_order\" [checked]=\"orderPermission.create\" (change)=\"orderPermission.create  = !orderPermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_order\" [checked]=\"orderPermission.edit\" (change)=\"orderPermission.edit = !orderPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_order\" [checked]=\"orderPermission.delete\" (change)=\"orderPermission.delete = !orderPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_order\" [checked]=\"orderPermission.view\" (change)=\"orderPermission.view = !orderPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage User Roles\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_role\" [checked]=\"rolePermission.create\" (change)=\"rolePermission.create = !rolePermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_role\" [checked]=\"rolePermission.edit\" (change)=\"rolePermission.edit = !rolePermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_role\" [checked]=\"rolePermission.delete\" (change)=\"rolePermission.delete = !rolePermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_role\" [checked]=\"rolePermission.view\" (change)=\"rolePermission.view = !rolePermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\">\n                                                                        Manage User Companies\n                                                                    </td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_company\" [checked]=\"companyPermission.create\" (change)=\"companyPermission.create = !companyPermission.create\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_company\" [checked]=\"companyPermission.edit\" (change)=\"companyPermission.edit = !companyPermission.edit\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_company\" [checked]=\"companyPermission.delete\" (change)=\"companyPermission.delete = !companyPermission.delete\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_company\" [checked]=\"companyPermission.view\" (change)=\"companyPermission.view = !companyPermission.view\"></td>\n                                                                </tr>\n                                                                <tr>\n                                                                    <td class=\"title\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"create_all\" value=\"create\" (change)=\"selectAll($event)\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"edit_all\" value=\"edit\" (change)=\"selectAll($event)\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"delete_all\" value=\"delete\" (change)=\"selectAll($event)\"></td>\n                                                                    <td class=\"title\"><input type=\"checkbox\" name=\"view_all\" value=\"view\" (change)=\"selectAll($event)\"></td>\n                                                                </tr>\n                                                            </tbody>\n                                                        </table>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </div>\n                                        <div class=\"row\">\n                                            <br>\n                                            <div class=\"col-sm-6\">\n                                                <label for=\"\" class=\"col-md-5 control-label\">Home Screen</label>\n                                                <div class=\"col-md-7\">\n                                                    <select class=\"form-control m-b\" name=\"home_url\" [(ngModel)]=\"home_url\">\n                                                        <option value=\"\"></option>\n                                                        <option value=\"dashboard\">Dashboard</option>\n                                                        <option value=\"users\">Users</option>\n                                                        <option value=\"roles\">User Roles</option>\n                                                        <option value=\"stores\">Stores</option>\n                                                        <option value=\"orders\">Orders</option>\n                                                    </select>\n                                                </div>\n                                            </div>\n                                            <div class=\"col-sm-6\">\n                                                <input type=\"checkbox\" name=\"display_dashboard\" [checked]=\"display_dashboard\" (change)=\"display_dashboard = !display_dashboard\">\n                                                <label for=\"\">Display Dashboard</label>\n                                            </div>\n                                        </div>\n                                        <br>\n                                    </div>\n                                    <div class=\"modal-footer\">\n                                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                                        <button type=\"button\" class=\"btn btn-accent\" data-dismiss=\"modal\" (click)=\"savePermissions()\">Save changes</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-md-3 control-label\" for=\"profilePassword\">Password</label>\n                        <div class=\"col-md-8\">\n                            <input type=\"password\" id=\"profilePassword\" placeholder=\"\" class=\"form-control\" name=\"password\" [(ngModel)]=\"customer.password\" #password=\"ngModel\">\n                        </div>\n                        <div *ngIf=\"userForm.submitted && !password.valid\" class=\"help-block\">Pasword is required</div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-md-3 control-label\" for=\"profileRepeatPassword\">Confirm Password</label>\n                        <div class=\"col-md-8\">\n                            <input type=\"password\" id=\"profileRepeatPassword\" placeholder=\"\" class=\"form-control\" name=\"confirmpassword\" [(ngModel)]=\"customer.confirm_password\" #confirmpassword=\"ngModel\">\n                        </div>\n                        <div *ngIf=\"(customer.password !== customer.confirm_password) && (confirmpassword.dirty|| confirmpassword.touched )\" class=\" col-lg-5 col-md-5  col-lg-offset-2 col-md-offset-3 alert alert-danger\">\n                            <div>The passwords entered do not match</div>\n                        </div>\n                    </div>\n                </fieldset>\n                <div class=\"panel-footer\">\n                    <div class=\"row\">\n                        <div class=\"col-md-9 col-md-offset-3\">\n                            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!userForm.form.valid\">Submit</button>\n                            <button type=\"reset\" class=\"btn btn-default\">Reset</button>\n                            <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">Cancel</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</div>"

/***/ }),
/* 308 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-sm-12\">\r\n        <div class=\"page-title\">\r\n            <div class=\"row\">\r\n                <h4 class=\"pull-left\">User Details</h4>\r\n                <ol class=\"breadcrumb pull-right\">\r\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\r\n                    <li>User Details</li>\r\n                </ol>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- end .page title-->\r\n\r\n<!-- end .page title-->\r\n<div class=\"row\">\r\n    <div class=\"col-sm-12 col-md-12\">\r\n        <div class=\"panel panel-card margin-b-30\">\r\n            <div class=\"well\">\r\n                <div class=\"panel-body\">\r\n                    <form class=\"form-horizontal group-border stripped\" name=\"form\" #userForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : username.invalid && username.touched }\">\r\n                            <label class=\"col-lg-2 col-md-3 control-label\">Name</label>\r\n                            <div class=\"col-lg-5 col-md-5\">\r\n                                <input type=\"text\" name=\"username\" placeholder=\"Enter Your UserName\" minlength=\"4\" maxlength=\"24\" class=\"form-control\" [(ngModel)]=\"staff.username\" #username=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : email.invalid && email.touched }\">\r\n                            <label class=\"col-lg-2 col-md-3 control-label\">Email</label>\r\n                            <div class=\"col-lg-5 col-md-5\">\r\n                                <input type=\"email\" name=\"email\" placeholder=\"Enter email\" class=\"form-control\" [(ngModel)]=\"staff.email\" #email=\"ngModel\" [email]=\"true\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : phone.invalid && phone.touched }\">\r\n                            <label class=\"col-lg-2 col-md-3 control-label\">Phone</label>\r\n                            <div class=\"col-lg-5 col-md-5\">\r\n                                <input type=\"text\" name=\"phone\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.phone\" #phone=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : mobile.invalid && mobile.touched }\">\r\n                            <label class=\"col-lg-2 col-md-3 control-label\">Mobile</label>\r\n                            <div class=\"col-lg-5 col-md-5\">\r\n                                <input type=\"text\" name=\"mobile\" placeholder=\"Phone number\" class=\"form-control\" [(ngModel)]=\"user_info.mobile\" #mobile=\"ngModel\" required>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label for=\"\" class=\"col-lg-2 col-md-3 control-label\">Stores</label>\r\n                            <div class=\"col-lg-5 col-md-5\">\r\n                                <ul class=\"form-control villages_list\">\r\n                                    <li *ngFor=\"let item of stores \">\r\n                                        <input type=\"checkbox\" name=\"select\" [checked]=\"item.checked\" value=\"{{item._id}}\" (change)=\"selectStores($event)\" />\r\n                                        <span>{{item.store_title}}</span>\r\n                                    </li>\r\n                                </ul>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\">\r\n                            <label class=\"col-lg-2 col-md-3 control-label\">Role</label>\r\n                            <div class=\"col-lg-3 col-md-3\" *ngIf=\"modalValid\">\r\n                                <select class=\"fancy-select form-control\" name=\"role\" [(ngModel)]=\"staff.role\" (change)=\"selectRole($event)\">\r\n                          <option *ngFor=\"let r of roles\" [value]=\"r.role_name\">{{r.role_name}}</option>\r\n                      </select>\r\n                            </div>\r\n                            <div class=\" col-lg-1 col-md-4\">\r\n                                <button type=\"button\" class=\"btn btn-info\" data-toggle=\"modal\" data-target=\"#roleModal\"> Manage This User's Permission</button>\r\n                            </div>\r\n                            <div class=\"modal fade\" id=\"roleModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\" style=\"display: none;\">\r\n                                <div class=\"modal-dialog\">\r\n                                    <div class=\"modal-content\">\r\n                                        <div class=\"modal-header text-center\">\r\n                                            <h4 class=\"modal-title\">Manage This User's Permission</h4>\r\n                                        </div>\r\n                                        <div class=\"modal-body\">\r\n                                            <div class=\"row\">\r\n                                                <div class=\"col-sm-12\">\r\n                                                    <div class=\"col-md-12 col-sm-12s\">\r\n                                                        <div class=\"table-responsive\">\r\n                                                            <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\r\n                                                                <thead>\r\n                                                                    <tr>\r\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\r\n                                                                            Permitted Action\r\n                                                                        </th>\r\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Create</th>\r\n                                                                        <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Edit</th>\r\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Deactivate</th>\r\n                                                                        <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"5\">View Only</th>\r\n                                                                    </tr>\r\n                                                                </thead>\r\n                                                                <tbody>\r\n                                                                    <tr>\r\n                                                                        <td class=\"title\">\r\n                                                                            Manage Staff Users\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_staff\" [checked]=\"staffPermission.create\" (change)=\"staffPermission.create = !staffPermission.create\" />\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_staff\" [checked]=\"staffPermission.edit\" (change)=\"staffPermission.edit = !staffPermission.edit\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_staff\" [checked]=\"staffPermission.delete\" (change)=\"staffPermission.delete = !staffPermission.delete\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_staff\" [checked]=\"staffPermission.view\" (change)=\"staffPermission.view = !staffPermission.view\"></td>\r\n                                                                    </tr>\r\n                                                                    <tr>\r\n                                                                        <td class=\"title\">\r\n                                                                            Manage Customer Users\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_customer\" [checked]=\"customerPermission.create\" (change)=\"customerPermission.create = !customerPermission.create\">\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_customer\" [checked]=\"customerPermission.edit\" (change)=\"customerPermission.edit = !customerPermission.edit\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_customer\" [checked]=\"customerPermission.delete\" (change)=\"customerPermission.delete = !customerPermission.delete\">\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_customer\" [checked]=\"customerPermission.view\" (change)=\"customerPermission.view = !customerPermission.view\"></td>\r\n                                                                    </tr>\r\n                                                                    <tr>\r\n                                                                        <td class=\"title\">\r\n                                                                            Manage Stores\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_store\" [checked]=\"storePermission.create\" (change)=\"storePermission.create = !storePermission.create\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_store\" [checked]=\"storePermission.edit\" (change)=\"storePermission.edit = !storePermission.edit\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_store\" [checked]=\"storePermission.delete\" (change)=\"storePermission.delete = !storePermission.delete\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_store\" [checked]=\"storePermission.view\" (change)=\"storePermission.view = !storePermission.view\"></td>\r\n                                                                    </tr>\r\n                                                                    <tr>\r\n                                                                        <td class=\"title\">\r\n                                                                            Manage Orders\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_order\" [checked]=\"orderPermission.create\" (change)=\"orderPermission.create  = !orderPermission.create\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_order\" [checked]=\"orderPermission.edit\" (change)=\"orderPermission.edit = !orderPermission.edit\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_order\" [checked]=\"orderPermission.delete\" (change)=\"orderPermission.delete = !orderPermission.delete\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_order\" [checked]=\"orderPermission.view\" (change)=\"orderPermission.view = !orderPermission.view\"></td>\r\n                                                                    </tr>\r\n                                                                    <tr>\r\n                                                                        <td class=\"title\">\r\n                                                                            Manage User Roles\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_role\" [checked]=\"rolePermission.create\" (change)=\"rolePermission.create = !rolePermission.create\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_role\" [checked]=\"rolePermission.edit\" (change)=\"rolePermission.edit = !rolePermission.edit\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_role\" [checked]=\"rolePermission.delete\" (change)=\"rolePermission.delete = !rolePermission.delete\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_role\" [checked]=\"rolePermission.view\" (change)=\"rolePermission.view = !rolePermission.view\"></td>\r\n                                                                    </tr>\r\n                                                                    <tr>\r\n                                                                        <td class=\"title\">\r\n                                                                            Manage Companies\r\n                                                                        </td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_company\" [checked]=\"companyPermission.create\" (change)=\"companyPermission.create = !companyPermission.create\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_company\" [checked]=\"companyPermission.edit\" (change)=\"companyPermission.edit = !companyPermission.edit\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_company\" [checked]=\"companyPermission.delete\" (change)=\"companyPermission.delete = !companyPermission.delete\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_company\" [checked]=\"companyPermission.view\" (change)=\"companyPermission.view = !companyPermission.view\"></td>\r\n                                                                    </tr>\r\n                                                                    <tr>\r\n                                                                        <td class=\"title\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"create_all\" value=\"create\" (change)=\"selectAll($event)\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"edit_all\" value=\"edit\" (change)=\"selectAll($event)\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"delete_all\" value=\"delete\" (change)=\"selectAll($event)\"></td>\r\n                                                                        <td class=\"title\"><input type=\"checkbox\" name=\"view_all\" value=\"view\" (change)=\"selectAll($event)\"></td>\r\n                                                                    </tr>\r\n                                                                </tbody>\r\n                                                            </table>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                            <div class=\"row\">\r\n                                                <br>\r\n                                                <div class=\"col-sm-6\">\r\n                                                    <label for=\"\" class=\"col-md-5 control-label\">Home Screen</label>\r\n                                                    <div class=\"col-md-7\">\r\n                                                        <select class=\"form-control m-b\" name=\"home_url\" [(ngModel)]=\"home_url\">\r\n                                                      <option value=\"\"></option>\r\n                                                      <option value=\"dashboard\">Dashboard</option>\r\n                                                      <option value=\"users\">Users</option>\r\n                                                      <option value=\"roles\">User Roles</option>\r\n                                                      <option value=\"stores\">Stores</option>\r\n                                                      <option value=\"orders\">Orders</option>\r\n                                                  </select>\r\n                                                    </div>\r\n                                                </div>\r\n                                                <div class=\"col-sm-6\">\r\n                                                    <input type=\"checkbox\" name=\"display_dashboard\" [checked]=\"display_dashboard\" (change)=\"display_dashboard = !display_dashboard\">\r\n                                                    <label for=\"\">Display Dashboard</label>\r\n                                                </div>\r\n                                            </div>\r\n                                            <br>\r\n                                        </div>\r\n                                        <div class=\"modal-footer\">\r\n                                            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n                                            <button type=\"button\" class=\"btn btn-accent\" data-dismiss=\"modal\" (click)=\"savePermissions()\">Save changes</button>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : password.invalid && password.touched }\">\r\n                            <label class=\"col-lg-2 col-md-3 control-label\">Password</label>\r\n                            <div class=\"col-lg-3 col-md-3\">\r\n                                <input type=\"Password\" name=\"password\" placeholder=\"\" class=\"form-control\" [(ngModel)]=\"staff.password\" #password=\"ngModel\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"form-group\" [ngClass]=\"{ 'has-error' : confirmPassword.invalid && confirmPassword.touched }\">\r\n                            <label class=\"col-lg-2 col-md-3 control-label\">Confirm Password</label>\r\n                            <div class=\"col-lg-3 col-md-3\">\r\n                                <input type=\"Password\" name=\"confirmPassword\" placeholder=\"\" class=\"form-control\" [(ngModel)]=\"staff.confirmPassword\" #confirmPassword=\"ngModel\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-5\">\r\n                            <div class=\"form-group text-center\">\r\n                                <button class=\"btn btn-info btn-primary\" (click)=\"cancel()\">\r\n                          Cancel\r\n                      </button>\r\n                                <button type=\"submit\" class=\"btn btn-info  btn-primary\">\r\n                      Save\r\n                    </button>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),
/* 309 */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"accounttype === 'staff'\">\r\n  <edit-staff [user]=\"user\"></edit-staff>\r\n</ng-container>\r\n<ng-container *ngIf=\"accounttype === 'customer'\">\r\n  <app-customeredit [user]=\"user\"></app-customeredit>\r\n</ng-container>\r\n"

/***/ }),
/* 310 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"page-title\">\n            <div class=\"row\">\n                <h4 class=\"pull-left\">User Management</h4>\n                <ol class=\"breadcrumb pull-right\">\n                    <li><a href=\"javascript: void(0);\"><i class=\"fa fa-home\"></i></a></li>\n                    <li>User Management</li>\n                </ol>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- end .page title-->\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <ngx-loading [show]=\"loading\"></ngx-loading>\n        <div class=\"form-group\">\n            <ng-container *ngIf=\"user.accounttype==='super'\">\n                <a [routerLink]=\"['/create']\" class=\"btn btn-primary\" id=\"create_user\"><i class=\"fa fa-user-plus\"></i> Create New User</a>\n            </ng-container>\n            <ng-container *ngIf=\"user.accounttype==='staff'\">\n                <a [routerLink]=\"['/create']\" class=\"btn btn-primary\" *ngIf=\"user_permission.staff.create || user_permission.customer.create\"><i class=\"fa fa-user-plus\"></i> Create New User</a>\n            </ng-container>\n            <ng-container *ngIf=\"user.accounttype==='customer'\">\n                <a [routerLink]=\"['/create']\" class=\"btn btn-primary\" *ngIf=\"user_permission.customer.create\"><i class=\"fa fa-user-plus\"></i> Create New User</a>\n            </ng-container>\n        </div>\n        <div class=\"well\" *ngIf=\"user.accounttype==='super'\">\n            <div class=\"row\">\n                <div class=\"col-sm-2\">\n                    <div class=\"form-group\">\n                        <label for=\"\" class=\"control-label\">Filter By</label>\n                    </div>\n                </div>\n                <div class=\"col-sm-1\">\n                    <div class=\"form-group\">\n                        <label class=\"control-label\" for=\"input-status\">User Type</label>\n                    </div>\n                </div>\n                <div class=\"col-sm-3\">\n                    <div class=\"form-group\">\n                        <select name=\"filter_status\" [(ngModel)]=\"filterUserType\" id=\"input-status\" class=\"form-control\">\n                            <option value=\"all\">All</option>\n                            <option value=\"staff\">Staff</option>\n                            <option value=\"customer\">Customer</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"col-sm-1\">\n                    <div class=\"form-group\">\n                        <button type=\"button\" (click)=\"filter()\" id=\"button-filter\" class=\"btn btn-primary pull-right\"><i class=\"fa fa-search\"></i> Filter</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"well\" *ngIf=\" user.accounttype==='staff' \">\n            <ng-container *ngIf=\" (user_permission.staff.create || user_permission.staff.edit || user_permission.staff.delete || user_permission.staff.view) && (user_permission.customer.create || user_permission.customer.edit || user_permission.customer.delete || user_permission.customer.view) \">\n                <div class=\"row\">\n                    <div class=\"col-sm-2\">\n                        <div class=\"form-group\">\n                            <label for=\"\" class=\"control-label\">Filter By</label>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-1\">\n                        <div class=\"form-group\">\n                            <label class=\"control-label\" for=\"input-status\">User Type</label>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-3\">\n                        <div class=\"form-group\">\n                            <select name=\"filter_status\" [(ngModel)]=\"filterUserType\" id=\"input-status\" class=\"form-control\">\n                                <option value=\"all\">All</option>\n                                <option value=\"staff\">Staff</option>\n                                <option value=\"customer\">Customer</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-1\">\n                        <div class=\"form-group\">\n                            <button type=\"button\" (click)=\"filter()\" id=\"button-filter\" class=\"btn btn-primary pull-right\"><i class=\"fa fa-search\"></i> Filter</button>\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </div>\n        <div class=\"well\" *ngIf=\" user.accounttype==='customer' \">\n            <ng-container *ngIf=\"user_permission.staff.create || user_permission.staff.delete || user_permission.staff.edit || user_permission.staff.view\">\n                <div class=\"row\">\n                    <div class=\"col-sm-2\">\n                        <div class=\"form-group\">\n                            <label for=\"\" class=\"control-label\">Filter By</label>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-1\">\n                        <div class=\"form-group\">\n                            <label class=\"control-label\" for=\"input-status\">User Type</label>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-3\">\n                        <div class=\"form-group\">\n                            <select name=\"filter_status\" [(ngModel)]=\"filterUserType\" id=\"input-status\" class=\"form-control\">\n                                <option value=\"all\">All</option>\n                                <option value=\"staff\"  >Staff</option>\n                                <option value=\"customer\">Customer</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-1\">\n                        <div class=\"form-group\">\n                            <button type=\"button\" (click)=\"filter()\" id=\"button-filter\" class=\"btn btn-primary pull-right\"><i class=\"fa fa-search\"></i> Filter</button>\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </div>\n        <form method=\"post\" enctype=\"multipart/form-data\" id=\"form-product\" class=\"\">\n            <div class=\"table-responsive\">\n                <table class=\"tablesaw\" data-tablesaw-sortable data-tablesaw-sortable-switch>\n                    <thead>\n                        <tr>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"persist\">\n                                #\n                            </th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-sortable-default-col data-tablesaw-priority=\"3\">Name</th>\n                            <th id=\"custom-sort\" scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"2\">Company</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"1\">User Type</th>\n                            <th scope=\"col\" data-tablesaw-sortable-col data-tablesaw-priority=\"4\">Status</th>\n                        </tr>\n                    </thead>\n                    <tbody *ngIf=\"user.accounttype === 'super'\">\n                        <tr *ngFor=\"let item of temp  \">\n                            <ng-container>\n                                <td class=\"title\">\n                                    <input type=\"checkbox\" name=\"select\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n                                </td>\n                                <td class=\"title\"><a [routerLink]=\"['/user', item._id]\">{{ item.username }}</a></td>\n                                <td class=\"title\">\n                                    <ng-container *ngIf=\"item.accounttype==='customer'\">\n                                        <ng-container *ngFor=\"let c of companies\">\n                                            <ng-container *ngFor=\"let t of item.temp\">\n                                                <ng-container *ngIf=\"c._id === t\">\n                                                    {{ c.name }}\n                                                </ng-container>\n                                            </ng-container>\n                                        </ng-container>\n                                    </ng-container>\n                                    <ng-container *ngIf=\"item.accounttype==='staff'\">\n                                        {{'Carpet Court'}}\n                                    </ng-container>\n                                </td>\n                                <td class=\"title\">{{ item.accounttype }}</td>\n                                <td class=\"title\">\n                                    <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                    <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                                </td>\n                            </ng-container>\n                        </tr>\n                    </tbody>\n                    <tbody *ngIf=\"user.accounttype === 'staff'\">\n                        <tr *ngFor=\"let item of temp\">\n                            <ng-container *ngIf=\"user_permission.customer.create || user_permission.customer.edit || user_permission.customer.delete || user_permission.customer.view \">\n                                <ng-container *ngIf=\" user_permission.staff.create || user_permission.staff.edit|| user_permission.staff.delete || user_permission.staff.view \">\n                                    <ng-container *ngIf=\"(item.accounttype !== 'super') && (item.username !== user.username)\">\n                                        <td class=\"title\">\n                                            <input type=\"checkbox\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n                                        </td>\n                                        <td class=\"title\">\n                                            <ng-container *ngIf=\"item.accounttype==='staff'\">\n                                                <a [routerLink]=\"['/user', item._id]\" *ngIf=\"user_permission.staff.edit\">{{ item.username }}</a>\n                                                <ng-container *ngIf=\"!user_permission.staff.edit\">\n                                                    {{ item.username }}\n                                                </ng-container>\n                                            </ng-container>\n                                            <ng-container *ngIf=\"item.accounttype==='customer'\">\n                                                <a [routerLink]=\"['/user', item._id]\" *ngIf=\"user_permission.customer.edit\">{{ item.username }}</a>\n                                                <ng-container *ngIf=\"!user_permission.customer.edit\">\n                                                    {{ item.username }}\n                                                </ng-container>\n                                            </ng-container>\n                                        </td>\n                                        <td class=\"title\">\n                                            <ng-container *ngIf=\"item.accounttype==='customer'\">\n                                                <ng-container *ngFor=\"let c of companies\">\n                                                    <ng-container *ngFor=\"let t of item.temp\">\n                                                        <ng-container *ngIf=\"c._id === t\">\n                                                            {{ c.name }}\n                                                        </ng-container>\n                                                    </ng-container>\n                                                </ng-container>\n                                            </ng-container>\n                                            <ng-container *ngIf=\"item.accounttype==='staff'\">\n                                                {{'Carpet Court'}}\n                                            </ng-container>\n                                        </td>\n                                        <td class=\"title\">{{ item.accounttype }}</td>\n                                        <td class=\"title\">\n                                            <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                            <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                                        </td>\n                                    </ng-container>\n                                </ng-container>\n                                <ng-container *ngIf=\" !user_permission.staff.create && !user_permission.staff.edit&& !user_permission.staff.delete && !user_permission.staff.view \">\n                                    <ng-container *ngIf=\"(item.accounttype !== 'super') && (item.accounttype !== 'staff') && (item.username !== user.username)\">\n                                        <td class=\"title\">\n                                            <input type=\"checkbox\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n                                        </td>\n                                        <td class=\"title\">\n                                            <a [routerLink]=\"['/user', item._id]\" *ngIf=\"user_permission.customer.edit\">{{ item.username }}</a>\n                                            <ng-container *ngIf=\"!user_permission.customer.edit\">\n                                                {{ item.username }}\n                                            </ng-container>\n                                        </td>\n                                        <td class=\"title\">\n                                            <ng-container *ngIf=\"item.accounttype==='customer'\">\n                                                <ng-container *ngFor=\"let c of companies\">\n                                                    <ng-container *ngFor=\"let t of item.temp\">\n                                                        <ng-container *ngIf=\"c._id === t\">\n                                                            {{ c.name }}\n                                                        </ng-container>\n                                                    </ng-container>\n                                                </ng-container>\n                                            </ng-container>\n                                        </td>\n                                        <td class=\"title\">{{ item.accounttype }}</td>\n                                        <td class=\"title\">\n                                            <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                            <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                                        </td>\n                                    </ng-container>\n                                </ng-container>\n                            </ng-container>\n                            <ng-container *ngIf=\"!user_permission.customer.create && !user_permission.customer.edit && !user_permission.customer.delete && !user_permission.customer.view \">\n                                <ng-container *ngIf=\"(item.accounttype == 'staff') && (item.username !== user.username) && (item.username !== user.parent)\">\n                                    <td class=\"title\">\n                                        <input type=\"checkbox\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n                                    </td>\n                                    <td class=\"title\">\n                                        <a [routerLink]=\"['/user', item._id]\" *ngIf=\"user_permission.staff.edit\">{{ item.username }}</a>\n                                        <ng-container *ngIf=\"!user_permission.staff.edit\">\n                                            {{ item.username }}\n                                        </ng-container>\n                                    </td>\n                                    <td class=\"title\">\n                                        {{ 'Carpet Court' }}\n                                    </td>\n                                    <td class=\"title\">{{ item.accounttype }}</td>\n                                    <td class=\"title\">\n                                        <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                        <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                                    </td>\n                                </ng-container>\n                            </ng-container>\n                        </tr>\n                    </tbody>\n                    <tbody *ngIf=\"user.accounttype === 'customer'\">\n                        <tr *ngFor=\"let item of childs\">\n                            <ng-container *ngIf=\"item.username !== user.username\">\n                                <td class=\"title\">\n                                    <input type=\"checkbox\" value=\"{{item._id}}\" (change)=\"selectElement($event)\" />\n                                </td>\n                                <td class=\"title\">\n                                    <ng-container *ngIf=\"user_permission\">\n                                        <a [routerLink]=\"['/user', item._id]\" *ngIf=\"user_permission.customer.edit\">{{ item.username }}</a>\n                                        <ng-container *ngIf=\"!user_permission.customer.edit\">{{ item.username }}</ng-container>\n                                    </ng-container>\n                                </td>\n                                <td class=\"title\">\n                                    <ng-container *ngFor=\"let c of companies\">\n                                        <ng-container *ngFor=\"let t of item.companies_assigned\">\n                                            <ng-container *ngIf=\"c._id === t\">\n                                                {{ c.name }}\n                                            </ng-container>\n                                        </ng-container>\n                                    </ng-container>\n                                    <ng-container *ngIf=\"item.accounttype ==='staff'\">\n                                        {{'Carpet Court'}}\n                                    </ng-container>\n                                </td>\n                                <td class=\"title\">{{ item.accounttype }}</td>\n                                <td class=\"title\">\n                                    <span class=\"label label-success\" *ngIf=\"item.status\">active</span>\n                                    <span class=\"label label-danger\" *ngIf=\"!item.status\">inactive</span>\n                                </td>\n                            </ng-container>\n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </form>\n        <br>\n        <div class=\"form-group\">\n            <ng-container *ngIf=\"user.accounttype === 'super'\">\n                <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary \" (click)=\"deleteUsers()\"><i class=\"fa fa-delete\"></i> Delete Selected</button>\n                <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"inActivateUsers()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n                <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"reActivateUsers()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n            </ng-container>\n            <ng-container *ngIf=\"user.accounttype === 'staff'\">\n                <ng-container *ngIf=\"user_role\">\n                    <ng-container *ngIf=\"user_permission.staff.delete || user_permission.customer.delete\">\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"inActivateUsers()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"reActivateUsers()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n                    </ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"user_permission\">\n                    <ng-container *ngIf=\"user_permission.staff.delete || user_permission.customer.delete\">\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"inActivateUsers()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"reActivateUsers()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n                    </ng-container>\n                </ng-container>\n            </ng-container>\n            <ng-container *ngIf=\" user.accounttype === 'customer' \">\n                <ng-container *ngIf=\"user_role\">\n                    <ng-container *ngIf=\" user_permission.customer.delete\">\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"inActivateUsers()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"reActivateUsers()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n                    </ng-container>\n                </ng-container>\n                <ng-container *ngIf=\"user_permission\">\n                    <ng-container *ngIf=\" user_permission.customer.delete\">\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"inActivateUsers()\"><i class=\"fa fa-delete\"></i> Deactivate Selected</button>\n                        <button type=\"button\" id=\"button-filter\" class=\"btn btn-primary\" (click)=\"reActivateUsers()\"><i class=\"fa fa-delete\"></i> Reactivate Selected</button>\n                    </ng-container>\n                </ng-container>\n            </ng-container>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(112);


/***/ })
],[349]);
//# sourceMappingURL=main.bundle.js.map
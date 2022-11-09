import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import 'leaflet/dist/leaflet.css';

import App from '@/App'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/Home/ProfileView.vue'
import TradeView from '../views/TradeView.vue'
import StoresView from '../views/Home/StoresView.vue'
import BannerView from "@/views/Home/BannerView";
import SettingsView from "@/views/Home/Profile/SettingsView";
import CollectionView from "@/views/Home/Profile/CollectionView";
import MarketView from "@/views/Home/Trade/MarketView";
import MyTradesView from "@/views/Home/Trade/MyTradesView";
import MuseoView from "@/views/Home/MuseoView";



const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: "login",
        component: LoginView
    },
    {path: '/:id',
        name: "home",
        component: HomeView,
        redirect: {name: 'banner'},
        children: [
            {path: 'home', name: "banner", component: BannerView},
            {path:'museo', name: "museo", component: MuseoView},
            {
                path: 'profile',
                name: "profile",
                component: ProfileView,
                children: [
                    {path: 'settings', name: "settings", component: SettingsView},
                    {
                        path: 'collection',
                        name: "collection",
                        component: CollectionView,
                    },
                ]
            },
            {
                path: 'trade',
                name: "trade",
                component: TradeView,
                children: [
                    {path: 'myTrades', name: "myTrades", component: MyTradesView},
                    {path: 'market', name: "market", component: MarketView},
                ]
            },
            {path: 'stores', name: "stores", component: StoresView},
        ]
    },

]

const router =VueRouter.createRouter({
    history:VueRouter.createWebHashHistory(),
    routes
});

const app=Vue.createApp(App);
app.use(router);
app.mount('#app');

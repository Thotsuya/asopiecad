<?php

namespace App\Providers;

use App\Policies\ProjectPolicy;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Schema::defaultStringLength(191);
        JsonResource::withoutWrapping();
         //Super admin role
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super Admin') ? true : null;
        });

        Gate::define('edit-project',[ProjectPolicy::class,'edit']);
        Gate::define('view-project',[ProjectPolicy::class,'view']);

        Gate::define('register-beneficiaries',[ProjectPolicy::class,'registerBeneficiaries']);
        Gate::define('approve-beneficiaries',[ProjectPolicy::class,'approveBeneficiaries']);
        Gate::define('edit-beneficiaries',[ProjectPolicy::class,'editBeneficiaries']);
        Gate::define('delete-beneficiaries',[ProjectPolicy::class,'deleteBeneficiaries']);

        Gate::define('register-appointments',[ProjectPolicy::class,'registerAppointments']);
        Gate::define('edit-appointments',[ProjectPolicy::class,'editAppointments']);

        Gate::define('register-goals',[ProjectPolicy::class,'registerGoals']);
        Gate::define('register-goal-progress',[ProjectPolicy::class,'registerGoalProgress']);


        Inertia::share('permissions', function(){
            return auth()->check() ? auth()->user()->getAllPermissions()->pluck('name') : [];
        });
    }
}

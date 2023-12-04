// package com.ryan.taskManager;

// import org.springframework.beans.factory.annotation.Configurable;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.Profile;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// @Profile("!https")
// public class SecurityConfig {

//     // ...

//     @Bean
//     public BCryptPasswordEncoder PasswordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http
//                 .csrf((csrf) -> csrf.disable())
//                 .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
//                         .requestMatchers("/admin/**").hasRole("ADMIN"))
//                 .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
//                         .requestMatchers("/anonymous*").anonymous())
//                 .authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
//                         .requestMatchers("/login*").permitAll().anyRequest().authenticated())
//                 .formLogin(form -> form
//                         .loginPage("/login")
//                         .loginProcessingUrl("/submit_login")
//                         .defaultSuccessUrl("/u")
//                         .failureUrl("/login?error=true"))
//                 // .failureHandler(authenticationFailureHandler()))

//                 .logout((logout) -> logout
//                         .deleteCookies("JSESSIONID")
//                         .logoutUrl("/submit_logout")
//                         .logoutSuccessUrl("/"));
//                 // .logoutSuccessHandler(logoutSuccessHandler())
//         return http.build();
//     }
//     // ...
// }
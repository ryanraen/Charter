package com.ryan.taskManager;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessTokenRepository extends JpaRepository<AccessToken, String>{
    
    public String findAccessTokenByUserID(int userID);

}

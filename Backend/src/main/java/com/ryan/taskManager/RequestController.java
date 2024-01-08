package com.ryan.taskManager;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;

import javax.swing.text.DateFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "/u")
public class RequestController {

// USER:
/*------------------------------------------------------------------------------------------------------------------------------------*/
    @Autowired
    private UserRepository userRepository;

    // USER SETTERS:
    /*------------------------------------------------------------------------------------------------------------------------------------*/
    // SET USER USERNAME
    @PostMapping(path = "/set/user/name/userid")
    public @ResponseBody String setUserNameByUserID(@RequestParam int userID, @RequestParam String username) {
        try {
            userRepository.findById(userID).get().setUsername(username);
            userRepository.flush();
            return "{\"status\": \"success\", \"message\": \"User username field altered!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter user username field.\"}";
        }
    }
    // SET USER EMAIL
    @PostMapping(path = "/set/user/email/userid")
    public @ResponseBody String setUserEmailByUserID(@RequestParam int userID, @RequestParam String email) {
        try {
            userRepository.findById(userID).get().setEmail(email);
            userRepository.flush();
            return "{\"status\": \"success\", \"message\": \"User email field altered!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter user email field.\"}";
        }
    }
    // SET USER PASSWORD
    @PostMapping(path = "/set/user/password/userid")
    public @ResponseBody String setUserPasswordByUserID(@RequestParam int userID, @RequestParam String password) {
        try {
            userRepository.findById(userID).get().setPassword(password);
            userRepository.flush();
            return "{\"status\": \"success\", \"message\": \"User password field altered!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter user password field.\"}";
        }
    }
    /*------------------------------------------------------------------------------------------------------------------------------------*/

    // REGISTER NEW USER
    @PostMapping(path = "/signin/register")
    public @ResponseBody String addNewUser(@RequestParam String name, @RequestParam String email, @RequestParam String password) {
        if(!userRepository.findByEmail(email).isPresent()) {
            User user = new User();
            try {
                user.setUsername(name);
                user.setEmail(email);
                user.setPassword(password);
                userRepository.save(user);
                return "{\"status\": \"success\", \"message\": \"User " + name + " saved!\", \"id\": \"" + user.getID() + "\"}";
            } catch(DataIntegrityViolationException e) {
                return "{\"status\": \"failure\", \"message\": \"Failed to create user.\", \"id\": \"" + user.getID() + "\"}"; // user is created but with no information => fix later
            }
        }
        else {
            return "{\"status\": \"failure\", \"message\": \"User with this email already exists!\", \"id\": \"null\"}";
        }
    }
    // DELETE A USER FROM THE DATABASE BY THEIR USER ID
    @PostMapping(path = "/delete/user/userid")
    public @ResponseBody String deleteUserAccountByUserID(@RequestParam int userID) {
        try {
            userRepository.deleteById(userID);
            userRepository.flush();
            return "{\"status\": \"success\", \"message\": \"User deleted successfully!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to delete user.\"}";
        }
    }
    // GET ALL USERS IN DATABASE
    @GetMapping(path = "/get/users/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        System.out.println("Getting all users!");
        return userRepository.findAll();
    }
    // GET USER BY USER ID
    @GetMapping(path = "/get/users/id")
    public @ResponseBody Optional<User> getUserById(@RequestParam int id) {
        return userRepository.findById(id);
    }
    // GET USER BY EMAIL
    @GetMapping(path = "/get/users/email")
    public @ResponseBody Optional<User> getUserByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email);
    }
    // GET USER BY USER NAME
    @GetMapping(path = "/get/users/username")
    public @ResponseBody Optional<User> getUserByUsername(@RequestParam String username) {
        return userRepository.findByUsername(username);
    }
    // AUTHENTICATE USER EMAIL AND PASSWORD
    @GetMapping(path = "/signin/auth/validate")
    public @ResponseBody String validateLogin(@RequestParam String email, @RequestParam String password) {
        try {
            if(userRepository.findByEmailAndPassword(email, password).isPresent()) {
                return "{\"status\": \"true\", \"id\": \"" + userRepository.findByEmailAndPassword(email, password).get().getID() + "\", \"username\": \"" + userRepository.findByEmailAndPassword(email, password).get().getUsername() + "\"}";
            }
        } catch(NoSuchElementException e) {
            e.printStackTrace();
        }
        return "{\"status\": \"false\", \"id\": \"" + userRepository.findByEmailAndPassword(email, password).get().getID() + "\", \"username\": \"" + userRepository.findByEmailAndPassword(email, password).get().getUsername() + "\"}";
    }
    // GENERATE USER SESSION TOKEN 
    @GetMapping(path = "/signin/auth/get/token")
    public @ResponseBody String getToken(@RequestParam int userID) {
        User user;
        try {
            user = userRepository.findById(userID).get();
        } catch(NoSuchElementException e) {
            System.out.println("No user described by such ID");
            e.printStackTrace();
            return null;
        }
        Random random = new Random();
        String tok = "";
        String[] characters = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
                               "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
                               "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
                               "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 
                               "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};
                            //    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "@", "#", 
                            //    "$", "%", "&", "*", "(", ")", "+", "-", ".", "~", "=", "-", "_"};
        for(int i = 0; i < 255; i++) {
            tok += characters[random.nextInt(characters.length)];
        }
        user.setAccessToken(tok);
        userRepository.flush();
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("EEE, dd MMM yyyy hh:mm:ss zzz");  
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.HOUR_OF_DAY, 24);
        date = calendar.getTime();
        String tokenExpiryDate = dateFormat.format(date);
        return "{\"token\": \"" + user.getAccessToken() + "\", \"expire\": \"" + tokenExpiryDate + "\"}";
    }
    // NULLIFY USER SESSION TOKEN BY USER ID
    @PostMapping(path = "/signin/nullify/token")
    public @ResponseBody String nullifyToken(@RequestParam int userID) {
        
        Optional<User> userE = userRepository.findById(userID);
        if(userE.isPresent()) {
            User user = userE.get();
            try {
                user.setAccessToken(null);
                userRepository.flush();
                return "{\"status\": \"success\", \"message\": \"Access token nullified.\"}";
            }
            catch (Exception e) {
                return "{\"status\": \"failure\", \"message\": \"User described by id exists; process encountered an error.\"}";
            }
        }
        else {
            return "{\"status\": \"failure\", \"message\": \"User described by this id does not exist.\"}";
        }
    }
    // CHECK IF USER SESSION TOKEN IS VALID (AUTHENTICATE USER ID WITH TOKEN && CHECK IF TOKEN IS EXPIRED)
    @GetMapping(path = "/signin/auth/check/token")
    public @ResponseBody String checkToken(@RequestParam int userID, @RequestParam String accessToken, @RequestParam String expiryDateString) {

        Date expiryDate = new Date();
        Date currentDate = new Date();
        try{
        expiryDate = new SimpleDateFormat("EEE, dd MMM yyyy hh:mm:ss ZZZ").parse(expiryDateString);
        } catch(Exception e) {
            e.printStackTrace();
        }
        if(expiryDate.compareTo(currentDate) <= 0) {
            return "{\"valid\": \"false\", \"message\": \"Access token expired.\"}";
        }
        User user;
        try {
            user = userRepository.findById(userID).get();
        } catch(NoSuchElementException e) {
            e.printStackTrace();
            return "{\"valid\": \"false\", \"message\": \"No user described by such ID.\"}";
        }
        return "{\"valid\": \"" + user.getAccessToken().equals(accessToken) + "\", \"message\": \"Access token is valid.\"}";
    }
/*------------------------------------------------------------------------------------------------------------------------------------*/
    
// WORKSPACE:
/*------------------------------------------------------------------------------------------------------------------------------------*/
    @Autowired
    private WorkspaceRepository workspaceRepository;

    // WORKSPACE SETTERS:
    /*------------------------------------------------------------------------------------------------------------------------------------*/
    // SET WORKSPACE USER ID
    @PostMapping(path = "/set/workspace/userid/workspaceid")
    public @ResponseBody String setWorkspaceUserIDByWorkspaceID(@RequestParam int workspaceID, @RequestParam int userID) {
        try {
            workspaceRepository.findById(workspaceID).get().setUserID(userRepository.findById(userID).get());
            workspaceRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Workspace userID field altered!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter workspace userID field.\"}";
        }
    }
    // SET WORKSPACE NAME
    @PostMapping(path = "/set/workspace/name/workspaceid")
    public @ResponseBody String setWorkspaceNameByWorkspaceID(@RequestParam int workspaceID, @RequestParam String name) {
        try {
            workspaceRepository.findById(workspaceID).get().setName(name);
            workspaceRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Workspace name field altered!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter workspace name field.\"}";
        }
    }
    // SET WORKSPACE PUBLICITY
    @PostMapping(path = "/set/workspace/isPublic/workspaceid")
    public @ResponseBody String setWorkspaceIsPublicByWorkspaceID(@RequestParam int workspaceID, @RequestParam boolean isPublic) {
        try {
            workspaceRepository.findById(workspaceID).get().setIsPublic(isPublic);
            workspaceRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Workspace isPublic field altered!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter workspace isPublic field.\"}";
        }
    }
    /*------------------------------------------------------------------------------------------------------------------------------------*/

    // CREATE WORKSPACE
    @PostMapping(path = "/assets/w/create") // w stands for workspace => when user is actually in workspace, URL will be "/w/{workspace id}"
    public @ResponseBody String createWorkspace(@RequestParam int userID, @RequestParam String workspaceName, @RequestParam boolean isPublic) {
        
        Workspace workspace = new Workspace();
        try {
            workspace.setUserID(userRepository.findById(userID).get());
            workspace.setName(workspaceName);
            workspace.setIsPublic(isPublic);
            
            workspaceRepository.save(workspace);
            return "{\"status\": \"success\", \"message\": \"Workspace successfully created!\", \"id\": \"" + workspace.getID() + "\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Workspace could not be created.\", \"id\": \"" + workspace.getID() + "\"}";
        }
    }
    // GET ALL WORKSPACE ENTITIES UNDER A USER
    @GetMapping(path = "/get/workspaces/all/userid")
    public @ResponseBody List<Workspace> getAllWorkspacesByUserID(int userID) {
        User user = userRepository.findById(userID).get();
        return user.getWorkspaces();
    }
    // GET ALL WORKSPACE IDS UNDER USER
    @GetMapping(path = "/get/workspaces/id/userid")
    public @ResponseBody List<Integer> getAllWorkspaceIDsByUserID(int userID) {
        User user = userRepository.findById(userID).get();
        List<Workspace> workspaces = user.getWorkspaces();
        List<Integer> workspaceIDs = new ArrayList<Integer>();
        for(int i = 0; i < workspaces.size(); i++) {
            workspaceIDs.add(workspaces.get(i).getID());
        }
        return workspaceIDs;
    }
    // GET NAME OF A WORKSPACE
    @GetMapping(path = "/get/workspaces/name/workspaceid")
    public @ResponseBody String getWorkspaceNameByID(int workspaceID) {
        return "{\"name\": \"" + workspaceRepository.findById(workspaceID).get().getName() + "\"}";
    }
    // GET CREATION DATE OF A WORKSPACE
    @GetMapping(path = "/get/workspaces/createddate/workspaceid")
    public @ResponseBody String getWorkspaceCreatedDateByID(int workspaceID) {
        return "{\"createdDate\": \"" + workspaceRepository.findById(workspaceID).get().getCreatedDate() + "\"}";
    }
    // GET WHETHER WORKSPACE IS PUBLIC (BOOLEAN)
    @GetMapping(path = "/get/workspaces/ispublic/workspaceid")
    public @ResponseBody String getWorkspaceIsPublicByID(int workspaceID) {
        return "{\"isPublic\": \"" + workspaceRepository.findById(workspaceID).get().getIsPublic() + "\"}";
    }
    // GET ID, NAME, CREATION DATE, AND PUBLICITY OF ALL WORKSPACES UNDER A USER (ALL THAT IS NEEDED TO RENDER FRONTEND)
    @GetMapping(path = "/get/workspaces/display/userid")
    public @ResponseBody List<String> getAllWorkspaceDisplayedInformationByUserID(@RequestParam int userID) {
        List<String> displayInfo = new ArrayList<String>();
        for(int i:getAllWorkspaceIDsByUserID(userID)) {
            Workspace workspace = workspaceRepository.findById(i).get();
            displayInfo.add(
                "{\"id\": \"" + i + "\", " +
                 "\"name\": \"" + workspace.getName() + "\", " +
                 "\"createdDate\": \"" + workspace.getCreatedDate() + "\", " +
                 "\"isPublic\": \"" + workspace.getIsPublic() + "\"}"
            );
        }
        return displayInfo;
    }
    // AUTHENTICATE USER AND WORKSPACE BEFORE REDIRECTING USER TO A SPECIFIC WORKSPACE PAGE
    @GetMapping("/w/auth/{userID}/{workspaceID}")
    public @ResponseBody String redirectToWorkspace(@PathVariable int userID, @PathVariable int workspaceID) {
        User user;
        Workspace workspace;

        try {
            user = userRepository.findById(userID).get();
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"User described by such ID does not exist.\"}";
        }

        try {
            workspace = workspaceRepository.findById(workspaceID).get();
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Workspace described by such ID does not exist.\"}";
        }
        if(workspace.getUserID() == userID) {
            return "{\"status\": \"success\", \"message\": \"Workspace found.\"}";
        }
        return "{\"status\": \"failure\", \"message\": \"Workspace does not belong to this user.\"}";
    }
    // RETURNS WORKSPACE ENTITY BY WORKSPACE ID
    @GetMapping("/w/{workspaceID}")
    public @ResponseBody List<Chart> redirectToWorkspace(@PathVariable int workspaceID) {
        return workspaceRepository.findById(workspaceID).get().getCharts();
    }
    // DELETE WORKSPACE BY WORKSPACE ID
    @PostMapping(path = "/delete/workspace/workspaceid")
    public @ResponseBody String deleteWorkspaceByWorkspaceID(@RequestParam int workspaceID) {
        try {
            workspaceRepository.deleteById(workspaceID);
            workspaceRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Workspace deleted successfully!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to delete workspace.\"}";
        }
    }
/*------------------------------------------------------------------------------------------------------------------------------------*/

// CHART:
/*------------------------------------------------------------------------------------------------------------------------------------*/
    @Autowired
    private ChartRepository chartRepository;

    // CHART SETTERS:
    /*------------------------------------------------------------------------------------------------------------------------------------*/
    // SET CHART WORKSPACE ID
    @PostMapping(path = "/set/chart/workspaceid/chartid")
    public @ResponseBody String setChartWorkspaceIDByChartID(@RequestParam int chartID, @RequestParam int workspaceID) {
        try {
            chartRepository.findById(chartID).get().setWorkspaceID(workspaceRepository.findById(workspaceID).get());
            chartRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Chart workspaceID field altered!\"}";
        } catch (Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter chart workspaceID field.\"}";
        }
    }
    // SET CHART NAME
    @PostMapping(path = "/set/chart/name/chartid")
    public @ResponseBody String setChartNameByChartID(@RequestParam int chartID, @RequestParam String name) {
        try {
            chartRepository.findById(chartID).get().setName(name);
            chartRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Chart name field altered!\"}";
        } catch (Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter chart name field.\"}";
        }
    }
    /*------------------------------------------------------------------------------------------------------------------------------------*/

    // CREATE CHART
    @PostMapping(path = "/assets/c/create") // c stands for chart => when user is actually in chart, URL will be "/c/{chart id}"
    public @ResponseBody String createChart(@RequestParam int workspaceID, @RequestParam String chartName) {
        
        Chart chart = new Chart();
        try {
            chart.setWorkspaceID(workspaceRepository.findById(workspaceID).get());
            chart.setName(chartName);
            chartRepository.save(chart);
            return "{\"status\": \"success\", \"message\": \"Chart successfully created!\", \"id\": \"" + chart.getID() + "\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Chart could not be created.\", \"id\": \"" + chart.getID() + "\"}";
        }
    }
    // GET ALL CHART ENTITIES UNDER WORKSPACE
    @GetMapping(path = "/get/charts/workspaceid")
    public @ResponseBody List<Chart> getAllChartsByWorkspaceID(int workspaceID) {
        Workspace workspace = workspaceRepository.findById(workspaceID).get();
        return workspace.getCharts();
    }
    // GET ALL CHART IDS UNDER WORKSPACE
    @GetMapping(path = "/get/charts/id/workspaceid")
    public @ResponseBody List<Integer> getAllChartIDsByWorkspaceID(int workspaceID) {
        Workspace workspace = workspaceRepository.findById(workspaceID).get();
        List<Chart> charts = workspace.getCharts();
        List<Integer> chartIDs = new ArrayList<Integer>();
        for(int i = 0; i < charts.size(); i++) {
            chartIDs.add(charts.get(i).getID());
        }
        return chartIDs;
    }
    // GET ID, NAME, CREATION DATE, AND ITEMS OF EVERY CHART UNDER A WORKSPACE (NEEDED FOR FRONTEND RENDERING)
    @GetMapping(path = "/get/charts/display/workspaceid")
    public @ResponseBody List<String> getAllChartDisplayedInformationByWorkspaceID(@RequestParam int workspaceID) {
        List<String> displayInfo = new ArrayList<String>();
        for(int i:getAllChartIDsByWorkspaceID(workspaceID)) {
            Chart chart = chartRepository.findById(i).get();
            displayInfo.add(
                "{\"id\": \"" + i + "\", " +
                 "\"name\": \"" + chart.getName() + "\", " +
                 "\"createdDate\": \"" + chart.getCreatedDate() + "\", " +
                 "\"items\": " + getAllItemDisplayedInformationByChartID(i) + "}"
            );
        }
        return displayInfo;
    }
    // DELETE CHART BY CHART ID
    @PostMapping(path = "/delete/chart/chartid")
    public @ResponseBody String deleteChartByChartID(@RequestParam int chartID) {
        try {
            chartRepository.deleteById(chartID);
            chartRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Chart deleted successfully!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to delete chart.\"}";
        }
    }
/*------------------------------------------------------------------------------------------------------------------------------------*/

// ITEM:
/*------------------------------------------------------------------------------------------------------------------------------------*/
    @Autowired
    private ItemRepository itemRepository;

    // ITEM SETTERS:
    /*------------------------------------------------------------------------------------------------------------------------------------*/
    // SET ITEM CHART ID
    @PostMapping(path = "/set/item/chartID/itemID")
    public @ResponseBody String setItemChartIDByItemID(@RequestParam int itemID, @RequestParam int chartID) {
        try {
            itemRepository.findById(itemID).get().setChartID(chartRepository.findById(chartID).get());
            itemRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Item chartID field altered!\"}";
        } catch (Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter item chartID field.\"}";
        }
    }
    // SET ITEM NAME
    @PostMapping(path = "/set/item/name/itemID")
    public @ResponseBody String setItemNameByItemID(@RequestParam int itemID, @RequestParam String name) {
        try {
            itemRepository.findById(itemID).get().setName(name);
            itemRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Item name field altered!\"}";
        } catch (Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter item name field.\"}";
        }
    }
    // SET ITEM DESCRIPTION
    @PostMapping(path = "/set/item/description/itemID")
    public @ResponseBody String setItemDescriptionByItemID(@RequestParam int itemID, @RequestParam String description) {
        try {
            itemRepository.findById(itemID).get().setDescription(description);
            itemRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Item description field altered!\"}";
        } catch (Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to alter item description field.\"}";
        }
    }
    /*------------------------------------------------------------------------------------------------------------------------------------*/

    // CREATE ITEM
    @PostMapping(path = "/assets/i/create")
    public @ResponseBody String createItem(@RequestParam int chartID, @RequestParam String itemName, @RequestParam String description) {
        Item item = new Item();
        try {
            item.setChartID(chartRepository.findById(chartID).get());
            item.setName(itemName);
            item.setDescription(description);
            itemRepository.save(item);
            return "{\"status\": \"success\", \"message\": \"Item successfully created!\", \"id\": \"" + item.getID() + "\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Item could not be created.\", \"id\": \"" + item.getID() + "\"}";
        }

    }
    // GET ALL ITEM ENTITIES UNDER CHART
    @GetMapping(path = "/get/items/chartid")
    public @ResponseBody List<Item> getAllItemsByChartID(int chartID) {
        Chart chart = chartRepository.findById(chartID).get();
        return chart.getItems();
    }
    // GET ALL ITEM IDS UNDER CHART
    @GetMapping(path = "/get/items/id/chartid")
    public @ResponseBody List<Integer> getAllItemIDsByChartID(int chartID) {
        Chart chart = chartRepository.findById(chartID).get();
        List<Item> items = chart.getItems();
        List<Integer> itemIDs = new ArrayList<Integer>();
        for(int i = 0; i < items.size(); i++) {
            itemIDs.add(items.get(i).getID());
        }
        return itemIDs;
    }
    // GET ID, NAME, DESCRIPTION, AND CREATION DATE OF ALL ITEMS UNDER A CHART (FOR FRONTEND RENDERING)
    @GetMapping(path = "/get/items/display/chartid")
    public @ResponseBody List<String> getAllItemDisplayedInformationByChartID(@RequestParam int chartID) {
        List<String> displayInfo = new ArrayList<String>();
        for(int i:getAllItemIDsByChartID(chartID)) {
            Item item = itemRepository.findById(i).get();
            displayInfo.add(
                "{\"id\": \"" + i + "\", " +
                 "\"name\": \"" + item.getName() + "\", " +
                 "\"description\": \"" + item.getDescription() + "\", " +
                 "\"createdDate\": \"" + item.getCreatedDate() + "\"}"
            );
        }
        return displayInfo;
    }
    // DELETE ITEM BY ITEM ID
    @PostMapping(path = "/delete/item/itemid")
    public @ResponseBody String deleteItemByItemID(@RequestParam int itemID) {
        try {
            itemRepository.deleteById(itemID);
            itemRepository.flush();
            return "{\"status\": \"success\", \"message\": \"Item deleted successfully!\"}";
        } catch(Exception e) {
            return "{\"status\": \"failure\", \"message\": \"Failed to delete item.\"}";
        }
    }
/*------------------------------------------------------------------------------------------------------------------------------------*/
}
